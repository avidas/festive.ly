"""
from festively import db
from datetime import datetime


class FestivalEntry(db.DynamicDocument):

    created_at = db.DateTimeField(default=datetime.now, required=True)
    name = db.StringField(max_length=255)
    description = db.StringField(max_length=512)
    # type of entry, eventbrite or meetup, 
    category = db.StringField(max_length=127)
    date = db.DateTimeField()
    # geojson field with lat and lon
    location = db.PointField(required=True)
"""
    # text address for the festival entry
    # address = db.StringField(required=True, max_length=511)
    # tags = listfield
    # isVolunteerNeeded
    # isChildFriendly
    # isWomenOnly
    # isVegetarian
    # isRecurring
    # fasting, women only
