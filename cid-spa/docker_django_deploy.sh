#!/bin/zsh
# A Script that you should run after 'yarn build' to deploy the SPA to dockerized django

# If you don't have lolcat just remove it. It's just for fun
echo Deploying...

while read version
do
    build=$version
done < "build.ver"

yarn install
yarn build
cp -r build/* ./docker_build
<<<<<<< HEAD

=======
cp -r ../cid-api-django/cidAPI/static/* ./docker_build/static/
>>>>>>> d3149ce3ab04f697866e2296268c3d2f5ad49a3b
echo "Committing..."

git add . # Adds the built project to the git stash
build=$((build+1))
echo $build >> 'build.ver'
git commit -am "Build 0.$build"

echo "Deployed Build 0.$build"