const { Zone } = require('bns')
const decode = require('./decode')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = function (cid, gateway='https://cloudflare-ipfs.com/ipfs/') {
  cid = decode(cid)
  return new Promise(async (resolve, reject) => {
    const zone = new Zone()
    try {
      const response = await fetch(`${gateway}${cid}`)
      const body = await response.text()
      
      for (let line of body.split('\n')) {
        try {
          if (line.length) {
            line = line.toString()
            zone.fromString(line)
          }
        } catch (error) {
          return reject(error)
        }
      }
      resolve(zone)
    } catch (error) {
      reject(error)
    }
  })
  return zone
}