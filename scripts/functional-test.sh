#!/bin/bash

##
# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -e
PATH=$(npm bin):$PATH

function cleanup() {
  if [ -n "$SERVER_PID" ]; then
    echo "Killing Test Server"
    kill $SERVER_PID
    unset SERVER_PID
  fi
}

trap cleanup EXIT SIGINT SIGQUIT SIGTERM

if [ -n "$SAUCE_USERNAME" -a -n "$SAUCE_ACCESS_KEY" ]; then
  echo "Using Sauce Labs for tests. Assuming VM already booted."
else
  echo "Not using Sauce Labs for tests. Installing most recent version of selenium server."
  selenium-standalone install
  echo "Selenium Server JAR: $(find node_modules/selenium-standalone -name "*.jar" | head -n 1)"
  echo ""
  echo "Fixing GeckoDriver version"
  # See https://github.com/vvo/selenium-standalone/issues/207#issuecomment-245165432
  # Assume OS X, Switch to linux if needed
  GD_PATH=node_modules/selenium-standalone/.selenium/geckodriver
  rm -fr $GD_PATH/0.10.0*
  if ls $GD_PATH | grep -q 0.9.0; then
    echo "Correct GeckoDriver version already installed"
  else
    URI_ARCH=mac
    if [ "$(uname)" == "Linux" ]; then
      URI_ARCH=linux64
    fi
    GD_URL=https://github.com/mozilla/geckodriver/releases/download/v0.9.0/geckodriver-v0.9.0-$URI_ARCH.tar.gz
    curl -sL $GD_URL | tar -xf - && \
      mv geckodriver node_modules/selenium-standalone/.selenium/geckodriver/0.9.0-x64-geckodriver
  fi
fi

MDL_FUNTEST_BASE_PATH=$PWD/test/functional
[ -n "$MDL_FUNTEST_PORT" ] || MDL_FUNTEST_PORT=8088

FUNTEST_BUILD_DIR=$MDL_FUNTEST_BASE_PATH/__build__
echo ""
echo "Creating build dir for test server assets at $FUNTEST_BUILD_DIR"
mkdir -p $FUNTEST_BUILD_DIR

echo ""
echo "Building Assets"
npm run build

echo ""
echo "Copying assets to test server assets build dir"
cp $PWD/build/material-design-lite.{css,js} $FUNTEST_BUILD_DIR

echo ""
echo "Starting test server..."
http-server $MDL_FUNTEST_BASE_PATH -s -p $MDL_FUNTEST_PORT >/dev/null 2>&1 &
SERVER_PID=$!
sleep 3

echo ""
echo "Checking that test server is running on $MDL_FUNTEST_PORT"
lsof -i :$MDL_FUNTEST_PORT | grep -q $SERVER_PID
if [ $? -ne 0 ]; then
  echo "Server start failed!"
  exit 2
fi
echo "Server up and running!"

set +e # We handle failures here

echo ""
echo "Running nightwatch with flags: $@"
cross-env MDL_FUNTEST_PORT=$MDL_FUNTEST_PORT nightwatch $@
res=$?

echo ""
if [ $res -ne 0 ]; then
  echo "Test failed! See output above"
  exit 1
fi
echo "All tests passed! Great job! :)"
