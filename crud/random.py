import hashlib
import time



def geerate_sha1_time():
    current_time = str(time.time()).encode('utf-8')
    sha1_hash = hashlib.sha1(current_time).hexdigest()
    return sha1_hash