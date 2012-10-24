#!/usr/bin/env python2.7

import os, sys
import subprocess

dirname = os.path.dirname(os.path.abspath(__file__))


print('\nImport `jasmine-node` into `jstests`')
os.chdir(os.path.join(dirname, 'jstests'))
print(os.getcwd())
err = subprocess.call('npm install jasmine-node', shell=True)
print('\nYou can run js tests with `./jstests/test.js`')
