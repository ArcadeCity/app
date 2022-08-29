import schnorr from 'bip-schnorr'
import { Buffer } from 'buffer'

export function getPublicKey(privateKey: Buffer) {
  return Buffer.from(schnorr.getPublicKey(privateKey)).toString('hex')
}
