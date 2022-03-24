var WriteStream = require('fs').WriteStream
var Temp = require('./temp')

class TempWriteStream extends WriteStream {
  constructor (template, options) {
    options = (typeof options === 'string') ? { encoding: options } : (options || {})

    const flags = options.flags === undefined ? 'w' : options.flags
    const mode = options.mode === undefined ? 0o666 : options.mode
    const { fd, path } = Temp.openSync(template, flags, mode)

    super(path, { ...options, fd })

    this.path = path
  }
}

module.exports = TempWriteStream
