# <p align="center">Home Watcher Remake - Raspberry Pi Program</p>

## Description

Allows the front end <a href="https://github.com/Wisbell/home-watcher-remake-front-end#readme" target="blank">Home Watcher Angular application</a> to start and stop the camera.

## Setup
- Setup motion sensor to use pin 7

[Johnny Five Motion API](http://johnny-five.io/api/motion/)

[RPI board layout](https://www.electronicwings.com/public/images/user_images/images/Raspberry%20Pi/RaspberryPi_GPIO/Raspberry%20pi%203%20GPIO_pins_v2.png)

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