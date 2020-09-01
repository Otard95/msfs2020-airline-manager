const {
  tscWatch,
  nodemonServer,
} = require('./dev:server')
const parcelServer = require('./dev:client')
const { setupExitHandler } = require('./scriptTools')

const tsc    = tscWatch()
const parcel = parcelServer()
const nm     = nodemonServer()

setupExitHandler(
  () => parcel.kill('SIGTERM'),
  () => tsc.kill('SIGTERM'),
  () => nm.emit('quit')
)
