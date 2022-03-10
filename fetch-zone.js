const { Zone } = require('bns')
const { create } = require('ipfs-core')
const all = require('it-all')
const split = require('it-split')
const { concat } = require('uint8arrays/concat')
const { toString } = require('uint8arrays/to-string')
const decode = require('./decode')

let node

module.exports = function (cid) {
  cid = decode(cid)
  return new Promise(async (resolve, reject) => {
    if (!node) {
      node = await create()
    }
    const zone = new Zone()
    try {
      for await (const chunk of split(node.cat('QmRhPDZ6DAnWKpzpt8tUwqNujS9uyZp69nDKF5Re9wrfdk'))) {
        const line = toString(chunk)
        if (line.length) {
          zone.fromString(line)
        }
      }
      resolve(zone)
    } catch (error) {
      reject(error)
    }
  })
  return zone
}