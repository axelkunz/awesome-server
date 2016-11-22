#!/bin/bash

git_folder="~/apps/awesome"
app_folder="~/git/awesome"

echo "git checkout"
git --work-tree=$app_folder --git-dir=$git_folder checkout -f

echo "change to app folder"
cd $app_folder

echo "npm install..."
export PATH=/package/host/localhost/nodejs-4/bin:$PATH
npm install

echo "build..."
ng build

echo "restart app..."
pm2 stop awesome
pm2 delete awesome
pm2 start $app_folder/server/server.js --name="awesome"
