const fetchZone = require('./fetch-zone');
const { Zone, wire: { types, codes } } = require('bns');

const empty = new Zone()

function middleware () {
  const zones = new Map()
  const add = (cid) => {
    let zone = zones.get(cid)
    if (zone) {
      return zone
    }

    const promise = new Promise((resolve, reject) => {
      fetchZone(cid).then(zone => {
        zones.set(cid, zone)
        resolve(zone)
      }).catch(reject)
    })
    zones.set(cid, promise)
    return promise
  }
  return {
    hostname: ':data.:protocol(_ipfs).:gateway?.', 
    handler: async ({ protocol, data }, name, type) => {
      data = data.split('.')
      const cid = data[data.length - 1]
      try {
        const zone = add(cid)
        if (!(zone instanceof Promise)) {
          return zone.resolve(name, types[type])
        } else {
          const res = empty.resolve(name, types[type])
          res.code = codes.SERVFAIL // ensure response not cached
          return res
        }
      } catch (e) {
        return null
      }
    }
  }
}

module.exports = middleware
