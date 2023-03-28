import json
import os
from re import sub


def camelCase(s):
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
    return ''.join([s[0].upper(), s[1:]])


env = ""
with open('env.json') as f:
    data = json.load(f)
    params = data['Parameters']

    for key, value in params.items():
        key = camelCase(key)
        env += key + "=" + value + " "

    env = env[:-1]

os.system(f"sam deploy -g --parameter-overrides '{env}'")
