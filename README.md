## Description
Node.js control software for Slamtec A1 RP Lidar

## API documentation and usage examples
Detailed APIs documentation is available on the [project Wiki](https://github.com/gcornetta/RPLidar/wiki/). A detailed example is available in the `example` folder.

## Usage
Make sure first that you have a working internet connection and that you have installed `node.js`and `git` on your computer then follow these steps:
1. clone this repo typing `git clone https://github.com/gcornetta/RPLidar.git`.
2. in the project folder run `npm install` to install the project dependencies.
3. type `npm start` to run the example.

To use the driver in your project follow these steps:
1. copy the `Lidar`folder into your project folder.
2. modify your `package.json` file adding the same dependencies of `RPLidar`
3. instantiate the driver using `const Lidar = require('path/to/Lidar/folder')`

## Software requirements
This software has been tested with `node.js v.16.6.0 LTS`. At the moment of writing this documentation the most recent `node.js` version was `v.18.7.0`.

## Disclaimer
I warmly recommend running this sofware either on a `Mac` or in `PCs` with a `Linux` OS distribution since this software has **not** been tested on `Windows`.


