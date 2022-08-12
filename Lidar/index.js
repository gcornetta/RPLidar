const { RPLidar } = require('@tsofist/rplidar')

/**
 * Class representing a Lidar
 */
class Lidar extends RPLidar {
  #scanning
  #start
  #connected

  constructor() {
    super()

    this.#scanning = false
    this.#start = false
    this.#connected = false
  }

  /**
   * Connect: opens a connection with the device
   * @returns { Promise } - Promise object with the connection status
   */
  async connect () {
   return new Promise((resolve, reject) => {
      if (!this.#connected) {
        this.#connected = true
        this
          .open()
          .then(() => {
           resolve(`<connect>: Lidar ready on "${this.serialPortPath}"`)
          })
        .catch( (e) => {
           reject('<connect>: ' + e.message)
        })
      } else {
        const e = new Error ('<connect>: RPLidar already connected')
        reject(e.message)
      }
    })
  }

 /**
   * Disconnect: closes the  connection with the device
   * @returns { Promise } - Promise object with the connection status
   */
  async disconnect () {
   return new Promise((resolve, reject) => {
      if (this.#connected) {
        this.#start = false
        this
          .close()
          .then(() => {
            resolve('<disconnect>: Lidar disconnected')
          })
        .catch( (e) => {
           reject('<disconnect>: ' + e.message)
        })
      } else {
        const e = new Error('<disconnect>: RPLidar already disconnected')
        reject(e.message)
      }
    })
  }

 /**
   * startMotor: starts spinning the Lidar
   * @returns { Promise } - Promise object with the motor status
   */
  async startMotor () {
   return new Promise((resolve, reject) => {

      if (this.#connected) {
        if (!this.#start) {
          this.#start = true
        }
        this
          .motorStart()
          .then(() => {
           resolve('<startMotor>: RPLidar motor started')
          })
        .catch( (e) => {
           reject('<startMotor>:' + e.message)
        })
      } else {
        const e = new Error('<startMotor>: RPLidar not connected')
        reject(e.message)
     }
   })
  }

 /**
   * stopMotor: stops spinning the Lidar
   * @returns { Promise } - Promise object with the motor status
   */
  async stopMotor () {
   return new Promise((resolve, reject) => {
     if (this.#connected) {
        if(this.#start) {
          this.#start = false
        }
      	this
          .motorStop()
          .then(() => {
           resolve('<stopMotor>: RPLidar motor stopped')
          })
          .catch((e) => {
            reject('<stopMotor>: ' + e.message)
          })
      } else {
        const e = new Error('<stopMotor>: RPLidar not connected')
        reject(e.message)
      }
    })
  }

 /**
   * startScan: starts scanning
   * @returns { Promise } - Promise object with the scan status
   */
  async startScan () {
    return new Promise((resolve, reject) => {
      if (this.#start) {
        if (!this.#scanning) { 
          this.#scanning = true
        }
        this
          .scanStart()
          .then(() => {
            resolve('Start scanning...')
          })
        .catch( (e) => {
          reject('<startScan>: ' + e.message)
        })
      } else {
        const e = new Error('<startScan>: Motor not started')
        reject(e.message)
      }
    })
  }

 /**
   * stopScan: stops scanning
   * @returns { Promise } - Promise object with the scan status
   */
  async stopScan () {
    return new Promise((resolve, reject) => {
      if (this.#start) {
        if (this.#scanning) {
          this.#scanning = false
        }
        this
          .scanStop()
          .then(() => {
            resolve('Stop scanning...')
          })
        .catch( (e) => {
          reject('<stopScan>: ' + e.message)
        })
      } else {
        const e = new Error('<stopScan>: Motor not started')
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
   * @returns { Promise } - Promise object with device info
   */
 async getInfo  () {
  return new Promise((resolve, reject) => {
    super
      .getInfo()
      .then((info) => {
         resolve(info)
      })
      .catch( (e) => {
         reject('<getInfo>: ' + e.message)
      })
   })
 }

 /**
   * Connect: returns the Lidar scanning speed (RPM or Hz)
   * @param { String } [s = rpm] - The format of Lidar speed
   * @returns { Promise } - Promise object with the scan speed
   */
 async getScanSpeed  (s = 'rpm') {
  return new Promise((resolve, reject) => {
    if (this.#scanning) {
      const speed = s.toLowerCase() === 'hz'
        ? this.scanningRPM
        : this.scanningHz
        resolve(`Speed: ${speed} ${s.toLowerCase === 'hz' ? 'Hz' : 'RPM'}`)
    } else {
      const e = new Error('<getScanSpeed>: Lidar not scanning')
      reject(e.message)
    }
   })
 }

 /**
   * getHealth: returns the health of the device
   * @returns { Promise } - Promise object with the device health
   */
 async getHealth  () {
  return new Promise((resolve, reject) => {
    super
      .getHealth()
      .then((health) => {
         resolve(health)
      })
      .catch( (e) => {
         reject('<getHealth>: ' + e.message)
      })
   })
 }

 /**
   * Connect: return the sampl ratesr
   * @returns { Promise } - Promise object with the device sample rates
   */
 async getSampleRates  () {
  return new Promise((resolve, reject) => {
    // could use also 'this' instead of 'super' but I prefer 'super' since the method names in the parent and child classes are very similar
    super
      .getSamplesRate()
      .then((sr) => {
         resolve(sr)
      })
      .catch( (e) => {
         reject('<getSampleRates>: ' + e.message)
      })
   })
 }

 /**
   * getScanModes: returns the scan modes of the device
   * @returns { Promise } - Promise object with the device scan modes
   */
 async getScanModes  () {
  return new Promise((resolve, reject) => {
    this
      .listScanModes()
      .then((sm) => {
         resolve(sm)
      })
      .catch( (e) => {
         reject('<getScanModes>: ' + e.message)
      })
   })
 }

}

module.exports = Lidar
