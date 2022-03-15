# IPFS Middleware

## Usage

`hipr-ipfs` is [hipr](https://github.com/lukeburns/hipr) middleware. 

if you don't have [hipr](https://github.com/lukeburns/hipr) installed, run
```
npm i -g hipr
```
then you can install the `hipr-ipfs` middleware
```
hipr install hipr-ipfs
```
and spin up a server
```
hipr hipr-ipfs :5333 198.41.0.4
```
this starts a recursive server on port 5333 capable of resolving zone files from ipfs using one of ICANN's root server as a stub resolver. If you want to resolve handshake names, and you are running [hsd](https://github.com/handshake-org/hsd) or [hnsd](https://github.com/handshake-org/hnsd) with a root server on port 5349, then start hipr with
```
hipr hipr-ipfs :5333 :5349
```

## Example

You can test that hipr is resolving properly by running
```
> dig @127.0.0.1 -p 5333 ipfs.chan0
66.42.108.201
```
which resolves `ipfs.chan0 A` via the ipfs zone file [bafybeibr4k6zof34lj3goushjbzbruqa6eknfvqrrlmizvbjfkn5x4nw6m](https://bafybeibr4k6zof34lj3goushjbzbruqa6eknfvqrrlmizvbjfkn5x4nw6m.ipfs.infura-ipfs.io/) obtained from the HIP-5 NS record
```
ipfs.chan0. 3600 IN NS bafybeibr4k6zof34lj3goushjbzbruqa6eknfvqrrlmizvbjfkn5x4nw6m._ipfs.
```
in the parent zone `chan0`. Note, `bafybeibr4k6zof34lj3goushjbzbruqa6eknfvqrrlmizvbjfkn5x4nw6m` is the CIDv1 (base32) encoded IPFS content identifier.

If you want to convert to CIDv1, you can use the [CID Inspector](https://cid.ipfs.io/#QmRhPDZ6DAnWKpzpt8tUwqNujS9uyZp69nDKF5Re9wrfdk).

IMPORTANT: the CIDv0 (base58) encoding [QmRhPDZ6DAnWKpzpt8tUwqNujS9uyZp69nDKF5Re9wrfdk](https://cloudflare-ipfs.com/ipfs/QmRhPDZ6DAnWKpzpt8tUwqNujS9uyZp69nDKF5Re9wrfdk) cannot be used in your NS record. For example,
```
; INVALID !!
ipfs.chan0. 3600 IN NS QmRhPDZ6DAnWKpzpt8tUwqNujS9uyZp69nDKF5Re9wrfdk._ipfs.
```
will not resolve properly, because hostnames are case-insensitive and the CID will be parsed as [qmrhpdz6danwkpzpt8tuwqnujs9uyzp69ndkf5re9wrfdk](https://cloudflare-ipfs.com/ipfs/qmrhpdz6danwkpzpt8tuwqnujs9uyzp69ndkf5re9wrfdk). You've been warned!
