#!/usr/bin/env node

const base32 = require('bs32')
const base58 = require('bs58')

const decode = cid => base58.encode(base32.decode(cid))

if (process.argv[2]) {
  try {
    process.stdout.write(decode(process.argv[2]))
  } catch (e) {}
}

module.exports = decode 

