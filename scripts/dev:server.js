const cp = require('child_process')
const nodemon = require('nodemon')
const { blue, green } = require('chalk')
const { setupExitHandler, trimChunk } = require('./scriptTools')

const tscWatch = () => {

  const tsc = cp.spawn('tsc', ['-w', '-p', 'server'])
    .on('message', (msg, handle) => console.log(`    [tsc][msg]  ${msg} [${handle}]`))
  
  tsc.stdout.on('data', chunk => console.log(blue('    [tsc]')     , trimChunk(chunk)))
  tsc.stderr.on('data', chunk => console.log(blue('    [tsc][err]'), trimChunk(chunk)))
  
  return tsc
  
}

const nodemonServer = () => {

  
  const nm = nodemon({ script: 'index.js', cwd: 'dist' })
    .on('start', () => {
      console.log(green('[nodemon]'), '  running...');
    })
    .on('crash', () => {
      console.log(green('[nodemon]'), '  server crashed!');
    })
    .on('restart', () => {
      console.log(green('[nodemon]'), '  restarting...');
    })

    return nm

}

const devServer = () => {

  const tsc = tscWatch()
  const nm = nodemonServer()

  setupExitHandler(
    () => tsc.kill('SIGTERM'),
    () => nm.emit('quit'),
  )

}

const resolveExport = () => {
  if (require.main === module)
    return devServer()
  
  return {
    devServer,
    setupExitHandler,
    tscWatch,
    nodemonServer,
  }
}

module.exports = resolveExport()
