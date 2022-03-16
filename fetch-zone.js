const { Zone } = require('bns')
const { create } = require('ipfs-core')
const all = require('it-all')
const split = require('it-split')
const { concat } = require('uint8arrays/concat')
const { toString } = require('uint8arrays/to-string')

let node = null
create().then(o => node = o).catch(console.error)

module.exports = function (cid) {
  return new Promise(async (resolve, reject) => {
    if (!node) {
      console.error('ipfs swarm not ready')
      return resolve(null)
    }

    const zone = new Zone()
    try {
      for await (const chunk of split(node.cat(cid))) {
        const line = toString(chunk)
        if (line.length) {
          zone.fromString(line.trim())
        }
      }
      resolve(zone)
    } catch (error) {
      reject(error)
    }
  })
}
