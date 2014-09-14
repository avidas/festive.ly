from festively.models import FestivalEntry
from urllib2 import urlopen
import json


def convert_keys_to_string(dictionary):
    """Recursively converts dictionary keys to strings."""
    if not isinstance(dictionary, dict):
        return dictionary
    return dict((str(k), convert_keys_to_string(v))
                for k, v in dictionary.items())


def batch_insert():
    """Batch load data in mongo for festivals only for
     festivals with address, longitude and fooditems
    """
    if FestivalEntry.objects().count() < 1:
        data_url = urlopen("http://data.sfgov.org/resource/rqzj-sfat.json")
        festivals_json = json.loads(data_url.read())

        festivals = [convert_keys_to_string(v) for v in festivals_json]

        for festival in festivals:
            if not festival.get("address") or not festival.get("longitude") or not festival.get("fooditems"):
                continue
            festival_entry = FestivalEntry(
                name=festival.get("name"),
                description=festival.get("description"),
                address=festival.get("address"),
                location=[float(str(festival.get("longitude"))),
                          float(str(festival.get("latitude")))])
            festival_entry.save()
