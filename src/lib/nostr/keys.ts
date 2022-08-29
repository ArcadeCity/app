import { Buffer } from 'buffer'
import * as secp256k1 from 'tiny-secp256k1-v1/js.js'

export function getPublicKey(privateKey: Buffer) {
  return Buffer.from(secp256k1.schnorr.getPublicKey(privateKey)).toString('hex')
}
