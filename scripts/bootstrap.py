#!/usr/bin/env python2.7

import os, sys
import subprocess

dirname = os.path.dirname(os.path.abspath(__file__))

os.chdir(os.path.join(dirname, os.pardir))
print('\nImporting node_modules into %s') % os.getcwd()
print('jasmine_node')
err = subprocess.call('npm install jasmine-node', shell=True)
print('\nYou can run js tests with `./jstests/test.js`')
