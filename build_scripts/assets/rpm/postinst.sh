#!/usr/bin/env bash
# Post install script for the UI .rpm to place symlinks in places to allow the CLI to work similarly in both versions

set -e

ln -s /opt/seno/resources/app.asar.unpacked/daemon/seno /usr/bin/seno || true
