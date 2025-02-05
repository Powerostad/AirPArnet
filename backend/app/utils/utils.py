from datetime import datetime
import pytz


def get_tehran_time():
    tehran_tz = pytz.timezone("Asia/Tehran")
    return datetime.now(tehran_tz)