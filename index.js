const fetchZone = require('./fetch-zone');
const { wire: { types } } = require('bns');

function middleware () {
  const zones = new Map()
  return {
    hostname: ':data.:protocol(_ipfs).', 
    handler: async ({ protocol, data }, name, type) => {
      data = data.split('.')
      const cid = data[data.length - 1]
      try {
        let zone = zones.get(cid) 
        if (!zone) {
          zone = await fetchZone(cid)
          zones.set(cid, zone)
        }
        const res = zone.resolve(name, types[type])
        return res
      } catch (e) {
        console.log('error', e)
        return null
      }
    }
  }
}

module.exports = middleware