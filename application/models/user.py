#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from application import models
from application.models.jobs_applied import JobsApplied
from application.models.weekly_stats import WeeklyStats, generate_week_range
from datetime import datetime, date
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, Float, ForeignKey,\
    MetaData, Table, JSON
import json


class UserReward(Base):
    """
    User Reward TO DO
    """
    __tablename__ = 'user_reward'
    metadata = Base.metadata
    user_id = Column(String(60),
                     ForeignKey('users.id'),
                     nullable=False,
                     primary_key=True)
    reward_id = Column(String(60),
                       ForeignKey('rewards.id'),
                       nullable=False,
                       primary_key=True)

    def __init__(self, *args, **kwargs):
        """
        initialize new UserReward Class
        """
        if kwargs:
            self.__set_attributes(kwargs)
        else:
            print('Need Kwargs')

    def __set_attributes(self, attr_dict):
        """
        private: converts attr_dict values to python class attributes
        """
        for attr, val in attr_dict.items():
            setattr(self, attr, val)

    def save(self):
        """
        Saves our userreward instance
        """
        models.database.new(self)
        models.database.save()

    def to_json(self):
        return {'user_id': self.user_id, 'reward_id': self.reward_id}

    def delete(self):
        """
        deletes instance from storage
        """
        models.database.delete(self)


class User(BaseModel, Base):
    """
    User class handles all application users
    """
    __tablename__ = 'users'
    user_name = Column(String(128), nullable=True)
    name = Column(String(128), nullable=False)
    email = Column(String(254), nullable=True)
    currency = Column(Integer, default=0)
    jobs_applied = relationship('JobsApplied')
    weekly_stats = relationship('WeeklyStats', back_populates='users')
    jobs_interested = Column(JSON, nullable=False)
    level_id = Column(String(60), ForeignKey('levels.id'))
    rewards = relationship('Reward', secondary='user_reward', viewonly=False)

    """ Dictionary of all keys in our JSON of jobs applied """
    applied_columns = ['date_applied', 'company', 'url', 'job_title', 'role', 'address', 'status', 'interview']
    sheets_columns = '"Date of Application","Company Name","URL to Job Post","Job Title (As Listed in Job Posting)",\
        "Role","Full Address","Status","Interviews Received","Additional Notes"\n'

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        if 'name' not in kwargs or not kwargs['name']:
            kwargs['name'] = kwargs['user_name']
        super().__init__(*args, **kwargs)
        self.jobs_interested = json.dumps({})

    def get_csv(self):
        """
        returns a csv formatted version of jobs applied
        """
        if not self.jobs_applied:
            return ''
        csv_applied = str(self.sheets_columns) + '\n'
        applied = json.loads(self.jobs_applied)
        for i in applied.values():
            for col in self.applied_columns:
                if col == 'interview':
                    csv_applied += '|'.join(i.get(col)) + ','
                else:
                    csv_applied += str(i.get(col)) + ','
                """ to fit csv formatting notes not included """
            csv_applied += i.get('notes') + '\n'
        return csv_applied

    def get_jobs_applied(self, **kwargs):
        """Queries database for jobs_applied table for entries associated with user
        Args:
        Returns:
            List of dictionary results
        """
        jobs = []
        if kwargs and 'start_date' in kwargs.keys() and 'end_date' in kwargs.keys():
            kwargs['user_id'] = self.id
            query_results = models.database.get_with_and_filters('JobsApplied', **kwargs)
        else:
            query_results = models.database.get_associated('JobsApplied', 'user_id', self.id)
        for job in query_results:
            jobs.append({'id': job.id,
                         'company': job.company,
                         'job_title': job.job_title,
                         'date_applied': job.date_applied,
                         'status': job.status,
                         'url': job.url,
                         'location': job.location,
                         'interview_progress': job.interview_progress,
                         'notes': job.notes,
                         })
        return jobs

    def create_jobs_applied(self, **kwargs):
        """Adds a job that a user has applied to the User and JobsApplied class

        Args:
            Keyword arguments containing the job descriptions

        Returns:
            None
        """
        # Create the job
        user = models.database.get('User', self.id)
        user.jobs_applied.append(JobsApplied(**kwargs))
        user.save()

        # Associate it to a weekly range in WeeklyStats
        date_applied = datetime.strptime(kwargs['date_applied'], '%Y-%m-%d')
        start, end = generate_week_range(date_applied)
        existing_weeks = models.database.get_associated('WeeklyStats',
                                                        'user_id', self.id)
        
        # TODO: Make this portion more efficient by implementing
        # A binary search if objects are returned in chronological order
        found = False
        for week in existing_weeks:
            if week.start_date == start:
                found = True
                week.num_applications += 1
                break

        if not found:
            week = WeeklyStats(user_id=self.id, start_date=start,
                              end_date=end, num_applications = 1)
        week.save()
    
    def edit_job(self, **kwargs):
        """Edits a job

        Args:
            Keyword arguments containing job descriptions
        Returns:
            None
        """
        filters = {'id': kwargs['id'], 'user_id': self.id}
        results = models.database.get_with_and_filters('JobsApplied', **filters)
        if results:
            job = results[0]
            for key, value in kwargs.items():
                if key == 'date_applied':
                    date_val = datetime.strptime(value, '%a, %d %b %Y %X %Z').date()
                    setattr(job, key, date_val)
                elif key != 'id':
                    setattr(job, key, value)
            job.save()
        

    # TODO consolidate repeated code in above and below functions
    # for week in weeks loop can be moved into separate function with 
    # binary search (or something) to improve efficiency
    def get_jobs_applied_stats(self, today):
        """Analyzes users history of jobs_applied up to (and including) date

        Args:
            today (datetime.datetime): End date of query search

        Returns:
            Average Jobs Applied Per Week (int), Jobs Applied This Week (int)
        """
        results = {}
        weeks = models.database.get_associated('WeeklyStats', 'user_id', self.id)
        start, end = generate_week_range(today)
        num_applications = [ week.num_applications for week in weeks ]
        
        found = False
        results['this_week'] = 0
        first_start = start
        for week in weeks:
            if week.start_date == start:
                found = True
                results['this_week'] += week.num_applications
            if week.start_date < first_start:
                first_start = week.start_date
        num_weeks = (end - first_start).days // 7
        if num_weeks != 0:
            results['avg_applications'] = sum(num_applications) // num_weeks
        else:
            results['avg_applications'] = 0
        results['num_weeks'] = num_weeks
        return results

    def get_jobs_interviewed_stats(self, date):
        """Analyzes users history of jobs_interviewed up to (and including) date
        
        """
        pass

    def get_user_rewards(self, **kwargs):
        """Queries database for user rewards table for entries associated with user
        Args:
        Returns:
            List of dictionary results
        """
        user_rewards = []
        query_results = models.database.get_associated('UserReward', 'user_id', self.id)
        for reward in query_results:
            user_rewards.append(models.database.get('Reward', reward.reward_id).to_json())
        return user_rewards

    def check_duplicate_reward(self, reward_id):
        """Queries database for user rewards table for entries that match user and reward id
        Args:
            reward_id the id of the reward being checked
        Returns:
            Boolean indicating presence of reward
        """
        user_rewards = self.get_user_rewards()
        for reward in user_rewards:
            if reward.get('id') == reward_id:
                return True
        return False
