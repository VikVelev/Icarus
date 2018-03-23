#!/bin/zsh
# A Script that you should run after 'yarn build' to deploy the SPA to dockerized django

# If you don't have lolcat just remove it. It's just for fun
echo Deploying... | lolcat -a -d 20

yarn install
yarn build
cp -r build/* ./docker_build

echo Deployed | lolcat -a -d 20