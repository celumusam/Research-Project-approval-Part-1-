from application.models.base_model import BaseModel
from application.models.level import Level
from application.models.reward import Reward
from application.models.user import User
from application.models.engine import storage
from application.models.jobs_applied import JobsApplied
from application.models.weekly_stats import WeeklyStats

""" CLASS_DICT has classes that are in models """
CLASS_DICT = storage.Storage.CLASS_DICT
database = storage.Storage()

database.reload()
