const {RPLidar} = require('@tsofist/rplidar')

/**
 * Class representing a Lidar
 */
class Lidar {
  constructor() {
    this.driver = new RPLidar()
    this.scanning = false
    this.start = false
    this.connected = false
  }

  /**
   * Getter method
   * @returns { Object } -- object with the driver core
   */
  get core () {
    return this.driver
  }

  /**
   * Connect: opens a connection with the device
   * @returns { Promise } - Promise object with the connection to the device
   */
  async connect () {
   return new Promise((resolve, reject) => {
      if (!this.connected) {
        this.connected = true
        this.driver
          .open()
          .then(() => {
           resolve(`Lidar ready on "${this.driver.serialPortPath}"`)
          })
        .catch( (e) => {
           reject(e.message)
        })
      } else {
        const e = new Error ('RPLidar already connected')
        reject(e.message)
      }
    })
  }

 /**
   * Disconnect: closes the  connection with the device
   * @returns { Promise } - Promise object with the connection to the device
   */
  async disconnect () {
   return new Promise((resolve, reject) => {
      if (this.connected) {
        this.start = false
        this.driver
          .close()
          .then(() => {
            resolve('Lidar disconnected')
          })
        .catch( (e) => {
           reject(e.message)
        })
      } else {
        const e = new Error('RPLidar already disconnected')
        reject(e.message)
      }
    })
  }

 /**
   * startMotor: starts spinning the Lidar
   * @returns { Promise } - Promise object with the connection to the device
   */
  async startMotor () {
   return new Promise((resolve, reject) => {

      if (this.connected) {
        if (!this.start) {
          this.start = true
        }
        this.driver
          .motorStart()
          .then(() => {
           resolve('RPLidar motor started')
          })
        .catch( (e) => {
           reject(e.message)
        })
      } else {
        const e = new Error('RPLidar not connected')
        reject(e.message)
     }
   })
  }

 /**
   * stopMotor: stops spinning the Lidar
   * @returns { Promise } - Promise object with the connection to the device
   */
  async stopMotor () {
   return new Promise((resolve, reject) => {
     if (this.connected) {
        if(this.start) {
          this.start = false
        }
      	this.driver
          .motorStop()
          .then(() => {
           resolve('RPLidar motor stopped')
          })
        .catch( (e) => {
           reject(e.message)
        })
      } else {
        const e = new Error('RPLidar not connected')
        reject(e.message)
      }
    })
  }

 /**
   * startScan: starts scanning
   * @returns { Promise } - Promise object with the connection to the device
   */
  async startScan () {
    return new Promise((resolve, reject) => {
      if (this.start) {
        if (!this.scanning) { 
          this.scanning = true
        }
        this.driver
          .scanStart()
          .then(() => {
            resolve('Start scanning...')
          })
        .catch( (e) => {
          reject(e.message)
        })
      } else {
        const e = new Error('Motor not started')
        reject(e.message)
      }
    })
  }

 /**
   * stopScan: stops scanning
   * @returns { Promise } - Promise object with the connection to the device
   */
  async stopScan () {
    return new Promise((resolve, reject) => {
      if (this.start) {
        if (this.scanning) {
          this.scanning = false
        }
        this.driver
          .scanStop()
          .then(() => {
            resolve('Stop scanning...')
          })
        .catch( (e) => {
          reject(e.message)
        })
      } else {
        const e = new Error('Motor not started')
        reject(e.message)
      }
    })
  }

 /**
   * delay: implements a delay
   * @param { number } ms - The delay in milliseconds
   * @returns { Promise } - Promise object with the  delay
   */
 async delay (ms) {
  return new Promise(resolve => {
   return setTimeout(resolve, ms)
  })
 }

 /**
   * getInfo: returns the Lidar information
   * @returns { Promise } - Promise object with the connection to the device
   */
 async getInfo  () {
  return new Promise((resolve, reject) => {
    this.driver
      .getInfo()
      .then((info) => {
         resolve(info)
      })
      .catch( (e) => {
         reject(e.message)
      })
   })
 }

 /**
   * Connect: returns the Lidar scanning speed (RPM or Hz)
   * @param { String } [s = rpm] - The format of Lidar speed
   * @returns { Promise } - Promise object with the connection to the device
   */
 async getScanSpeed  (s = 'rpm') {
  return new Promise((resolve, reject) => {
    if (this.scanning) {
      const speed = s.toLowerCase() === 'hz' 
        ? this.driver.scanningRPM 
        : this.driver.scanningHz
        resolve(`${speed} ${s.toLowerCase === 'hz' ? 'Hz' : 'RPM'}`)
    } else {
      const e = new Error('Lidar not scanning')
      reject(e.message)
    }
   })
 }

 /**
   * getHealth: returns the health of the device
   * @returns { Promise } - Promise object with the connection to the device
   */
 async getHealth  () {
  return new Promise((resolve, reject) => {
    this.driver
      .getHealth()
      .then((health) => {
         resolve(health)
      })
      .catch( (e) => {
         reject(e.message)
      })
   })
 }

 /**
   * Connect: return the sampl ratesr
   * @returns { Promise } - Promise object with the connection to the device
   */
 async getSampleRates  () {
  return new Promise((resolve, reject) => {
    this.driver
      .getSamplesRate()
      .then((sr) => {
         resolve(sr)
      })
      .catch( (e) => {
         reject(e.message)
      })
   })
 }

 /**
   * getScanModes: returns the scan modes of the device
   * @returns { Promise } - Promise object with the connection to the device
   */
 async getScanModes  () {
  return new Promise((resolve, reject) => {
    this.driver
      .listScanModes()
      .then((sm) => {
         resolve(sm)
      })
      .catch( (e) => {
         reject(e.message)
      })
   })
 }

}


const lidar = new Lidar()


/**
  * connect: connects to Lidar
  */
const connect = async () => {
  try {
    const msg = await lidar.connect()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * disconnect: disconnects from Lidar
  */
const disconnect = async () => {
  try {
    const msg = await lidar.disconnect()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * start: starts spinning the Lidar
  */
const start = async () => {
  try {
    const msg = await lidar.startMotor()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * stop: stops spinning Lidar
  */
const stop = async () => {
  try {
    const msg = await lidar.stopMotor()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * startScan: starts scanning
  */
const startScan = async () => {
  try {
    const msg = await lidar.startScan()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * stopScan: stops scanning
  */
const stopScan = async () => {
  try {
    const msg = await lidar.stopScan()
    console.log(msg)
  } catch (e) {
    console.error(e)
  }
}

/**
  * delay: implements a delay
  * @param { number } ms - The delay in milliseconds
  */
const delay = async (ms) => {
  await lidar.delay(ms)
}

/**
  * scanSpeed: cgets the scan speed (in RPM or Hz)
  * @param{ mumber } [s= rpm] - the speed format (RPM or Hz)
  */
const scanSpeed = async (s = 'rpm') => {
  try {
    const speed = s.toLowerCase() === 'hz' ?  await lidar.getScanSpeed('hz') :  await lidar.getScanSpeed()
    console.log(speed)
  } catch (e) {
    console.error(e)
  }
}

/**
  * info: gets device info
  */
const  info = async () => {
  try {
     const msg = await lidar.getInfo()
     console.log(msg)
  } catch (e) {
    console.log(e)
  }
}


/**
  * health: gets device health
  */
const  health = async () => {
  try {
     const msg = await lidar.getHealth()
     console.log(msg)
  } catch (e) {
    console.log(e)
  }
}

/**
  * sampleRates: gets device sample rates
  */
const  sampleRates = async () => {
  try {
     const msg = await lidar.getSampleRates()
     console.log(msg)
  } catch (e) {
    console.log(e)
  }
}

/**
  * scanModes: gets device scan modes
  */
const  scanModes = async () => {
  try {
     const msg = await lidar.getScanModes()
     console.log(msg)
  } catch (e) {
    console.log(e)
  }
}

// test function
const  go = async () => {
  // set an event listened on core device driver to capture samples
  lidar.core.on('scan:sample', (sample) => {
   console.log('sample :', sample)
  })


  await connect()
  await info()
  await health()
  await sampleRates()
  await scanModes()
  await stop()
  await delay(5000)
  await start()
  await delay(1000)
  await scanSpeed()
  await delay(5000)
  await stop()
  await delay(5000)
  await startScan()
  await delay(1000)
  await scanSpeed()
  await delay(5000)
  await stopScan()
  await delay(1000)
  await start()
  await delay(1000)
  await startScan()
  await delay(1000)
  await scanSpeed()
  await delay(5000)
  await stopScan()
  await delay(1000)
  await stop()
  await delay(1000)
  await disconnect()
}


go()
