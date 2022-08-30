import { convert } from 'bip-schnorr'
import { Buffer } from 'buffer'

// import { Point } from './Point'
const BigInteger = require('bigi')
const ecurve = require('ecurve')
const curve = ecurve.getCurveByName('secp256k1')

const G = curve.G

/**
 * Get the public key from a private key.
 * We can't use noble/secp256k1 because the BigInt shim doesn't work on Android.
 * "Schnorr's pubkey is just `x` of Point"
 * We will try rebuilding the algorithm here and in ./Point.ts
 */
export function getPublicKey(privateKey: Buffer) {
  const privateKeyBigInteger = BigInteger.fromBuffer(privateKey)
  console.log('privateKeyBigInteger', privateKeyBigInteger)
  const P = G.multiply(privateKeyBigInteger)
  console.log('P WHAT', P)
  // const wat = P.affineX.toString('hex') //  toString() radix argument must be between 2 and 36
  const wat = P.affineX
  console.log('wat:', wat)
  const Px = convert.intToBuffer(P.affineX)
  console.log('Px:', Px)
  const publicKey = Buffer.concat([Buffer.from([0x02 + (P.affineY.isEven() ? 0 : 1)]), Px])
  console.log('what the fuck is this:', publicKey)
  console.log('what the fuck is this continued:', publicKey.toString('hex'))
  console.log('px to string what:', Px.toString('hex'))
  return Px.toString('hex')
}
