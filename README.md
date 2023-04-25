# sep6fe

# Cloning the fe

If cloning from the start:

git clone --recurse-submodules git@github.com:constantinginga/sep6fe.git

If fetching an update:

cd src/models - enter directory for submodules
git submodule init - initialize configurations for local machine.(needed once for the first time pulling the submodule.)
git submodule update - to fetch all data contained in submodule.

# Building/docker usage:

Prerequisites:

1. Port 3000 open.
2. Docker is installed.

### Simple information:

- Will update the contents inside the container by itself such as ts or js files, as long as no additional dependencies were added, for that repeat the building process.

### building the container:

docker-compose build

### first start of the container.

docker run -d --rm -p 5173:5173 --name best-movies-app-1 best-movies-app

### After that if the computer was turned off just do

docker-compose start

### If want to stop the container:

docker-compose stop
