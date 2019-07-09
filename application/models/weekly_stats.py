#!/usr/bin/python3
"""
Contains the WeeklyStats Class
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
import application.models
from datetime import datetime, date, timedelta
from sqlalchemy.orm import relationship, backref
from sqlalchemy import (
    Column, Integer, String, Float, ForeignKey,
    MetaData, Table, JSON, Date)
import json


class WeeklyStats(BaseModel, Base):
    """WeeklyStats keeps track of weekly stats for users.
    This table has a many to one relationship with the Users table

    Attributes:
        user_id (str): Foreign key that associates WeeklyStats with a user
        week_range (str): Tracks the week range in following format:
            yyyy-mm-dd:yyyy-mm-dd
        num_applications (str): Number of applications user applied to
            within the week range
        num_interviews (str): Number of interviews user had (not received) 
            within the week range.
    """
    __tablename__ = 'weekly_stats'
    user_id = Column(String(60), ForeignKey('users.id'))
    users = relationship('User', back_populates='weekly_stats')
    start_date = Column(Date())
    end_date = Column(Date())
    num_applications = Column(Integer, default=0)
    num_interviews = Column(Integer, default=0)


def generate_week_range(input_date):
    """Generates a string corresponding to the week range of the given date
    Week: Monday to Sunday

    Args:
        input_date (datetime.date): Corresponds to a single date.

    Returns:
        tuple of datetime objects: Corresponds to start of week and end of week
    """
    weekday = int(input_date.strftime('%d'))

    start_week = input_date + timedelta(days=-(weekday - 1))
    end_week = start_week + timedelta(days=6)

    return start_week, end_week
