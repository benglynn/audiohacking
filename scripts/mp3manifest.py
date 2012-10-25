#!/usr/bin/env python

""" Create a manifest inside the `mp3` dir with the name and size of each
file. """

import os
import json
import re

dirname = os.path.dirname(os.path.abspath(__file__))
filename = 'manifest.json'
mandict = {}
mp3 = re.compile(r'^.*\.mp3$')

os.chdir(os.path.join(dirname, os.pardir, 'static', 'mp3'))
names = os.listdir('.')
for name in names:
    if mp3.match(name):
        bytes = os.stat(name).st_size
        mandict[name] = bytes

file = open(filename, 'w')
file.write(json.dumps(mandict))
file.close()

print 'Updated `%s` in `%s`' % (filename, os.getcwd())
