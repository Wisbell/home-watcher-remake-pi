# <p align="center">Home Watcher Remake - Raspberry Pi Program</p>

## Description

Allows the front end <a href="https://github.com/Wisbell/home-watcher-remake-front-end#readme" target="blank">Home Watcher Angular application</a> to start and stop the camera.

## Installation

```bash
# sudo may be need to install requried libs
$ npm install
```

## Running the app
**The app can be run without the [Home Watcher RPI server](https://github.com/Wisbell/home-watcher-remake-pi#readme), but the server is required to interact with the [front end application](https://github.com/Wisbell/home-watcher-remake-front-end#readme).**

```bash
# sudo is necessary to work with RPI pins and camera module
# watch mode
$ sudo npm run start:dev

# production mode
$ sudo npm run start:prod
```