#!/usr/bin/env node

const base32 = require('bs32')
const base58 = require('bs58')

const encode = cid => base32.encode(Buffer.from(base58.decode(cid)))

if (process.argv[2]) {
  try {
    process.stdout.write(encode(process.argv[2]))
  } catch (e) {}
}

module.exports = encode 