#!/usr/bin/env python

""" Create a manifest inside the `mp3` dir with the name and size of each
file. """

import os
import json
import re

thisdir = os.path.dirname(os.path.abspath(__file__))
staticdir = os.path.join(thisdir, os.pardir, 'static')
mp3dir = os.path.join(staticdir, 'mp3')
manifestfile = os.path.join(staticdir, 'js', 'app', 'manifest.js')

manifest = {'mp3': []}
mp3pattern = re.compile(r'^(.*)\.mp3$')

os.chdir(mp3dir)
names = os.listdir('.')
for name in names:
    match = mp3pattern.match(name)
    if match:
        bytes = os.stat(name).st_size
        manifest['mp3'].append({
                'name': match.group(1),
                'bytes': bytes,
                'url': 'mp3/' + name})

file = open(manifestfile, 'w')
file.write('define(%s)' % json.dumps(manifest))
file.close()

