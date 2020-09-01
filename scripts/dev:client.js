const cp = require('child_process')
const { yellowBright } = require('chalk')
const { setupExitHandler, trimChunk } = require('./scriptTools')

const parcelServer = () => {

  const parcel = cp.spawn('parcel', ['client/index.html', '--out-dir', 'dist/public'])
    .on('message', (msg, handle) => console.log(` [parcel][msg]  ${msg} [${handle}]`))

  parcel.stdout.on('data', chunk => console.log(yellowBright(' [parcel]'), trimChunk(chunk)))
  parcel.stderr.on('data', chunk => console.log(yellowBright(' [parcel][err]'), trimChunk(chunk)))

  return parcel

}

const devServer = () => {

  const parcel = parcelServer()

  setupExitHandler(() => parcel.kill('SIGTERM'))

}

const resolveExport = () => {
  if (require.main === module)
    return devServer()

  return parcelServer
}

module.exports = resolveExport()
