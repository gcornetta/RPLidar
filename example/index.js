const { Lidar }  = require('../Lidar')
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
const go = async () => {
  // set an event listened on core device driver to capture samples
  lidar.on('scan:sample', (sample) => {
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

module.exports = go
