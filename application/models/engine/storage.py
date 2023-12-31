#!/usr/bin/env python3
"""
Database engine
"""

from os import getenv
from sqlalchemy import create_engine, MetaData, and_
from sqlalchemy.orm import sessionmaker, scoped_session
from application.models.base_model import Base
from application.models import base_model, user, level, reward
from application.models.jobs_applied import JobsApplied
from application.models.weekly_stats import WeeklyStats
from application.models.user import UserReward

class Storage:
    """
    storage of class instances
    """
    CLASS_DICT = {
        'User': user.User,
        'Level': level.Level,
        'Reward': reward.Reward,
        'JobsApplied': JobsApplied,
    }

    __engine = None
    __session = None

    def __init__(self):
        """
        initialize the engine
        """
        self.__engine = create_engine(
            'mysql+pymysql://{}:{}@{}/{}'.format(
                getenv('JO_MYSQL_USER'),
                getenv('JO_MYSQL_PWD'),
                getenv('JO_MYSQL_HOST'),
                getenv('JO_MYSQL_DB')))

    def all(self, cls=None):
        """
        returns all objects
        """
        obj_dict = {}
        if cls is not None:
            a_query = self.__session.query(Storage.CLASS_DICT[cls])
            for obj in a_query:
                obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                obj_dict[obj_ref] = obj
        else:
            for cls in Storage.CLASS_DICT.values():
                a_query = self.__session.query(cls)
                for obj in a_query:
                    obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                    obj_dict[obj_ref] = obj

        return obj_dict

    def new(self, obj):
        """
        add object to db
        """
        self.__session.add(obj)

    def save(self):
        """
        commits changes to db session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        deletes obj from db session if obj != None
        """
        if obj:
            self.__session.delete(obj)
            self.save()

    def reload(self):
        """
        creates tables in db and session from engine
        """
        Base.metadata.create_all(self.__engine)
        self.__session = scoped_session(
            sessionmaker(
                bind=self.__engine,
                expire_on_commit=False))

    def close(self):
        """
        calls remove() on session attribute
        """
        self.__session.remove()

    def get(self, cls, id):
        """
        gets one object based on the class and id
        """
        if cls and id:
            obj_str = '{}.{}'.format(cls, id)
            all_obj = self.all(cls)
            return all_obj.get(obj_str)
        return None
    
    def get_associated(self, table, column, value):
        """Queries the table for values that match foreign id
        Args:
            table (str): table to query
            column (str): name of column to search through
            value (str): value of column to match.

        Returns: 
            List[Objects]: Each matched object from query
        """
        results = []
        query_filter = "{}.{} == '{}'".format(table, column, value)
        for result in self.__session.query(eval(table)).\
            filter(eval(query_filter)):
            results.append(result)
        return results
    
    def get_with_and_filters(self, table, **kwargs):
        """Queries the table for values that match the given kwargs
        Args:
            table (str): table to query
            kwargs: each key represents a column in table,
                    each value represents a value to match in the column

        Returns: 
            List[Objects]: Each matched object from query
        """
        results = []
        if kwargs and 'start_date' in kwargs.keys() and 'end_date' in kwargs.keys():
            start_date = kwargs['start_date']
            end_date = kwargs['end_date']
            kwargs.pop('start_date')
            kwargs.pop('end_date')
            for result in self.__session.query(eval(table)).\
                filter(eval(table).date_applied.between(start_date, end_date)).\
                filter_by(**kwargs):
                results.append(result)
        else:
            for result in self.__session.query(eval(table)).\
                filter_by(**kwargs):
                results.append(result)
        return results

    def count(self, cls=None):
        """
        returns count of all objects
        """
        return (len(self.all(cls)))
