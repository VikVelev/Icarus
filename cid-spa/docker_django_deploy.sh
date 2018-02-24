#!/bin/zsh
# A Script that runs after 'yarn build' to deploy the SPA to dockerized django

echo Deploying... | lolcat

cp -r build/* ../cid-api-django/cidAPI/static/

echo Deployed | lolcat