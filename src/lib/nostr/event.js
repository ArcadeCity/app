import { Buffer } from 'buffer'
import createHash from 'create-hash/browser'
import schnorr from 'bip-schnorr'
// import * as secp256k1 from '@alephium/noble-secp256k1'

export function getBlankEvent() {
  return {
    kind: 255,
    pubkey: null,
    content: '',
    tags: [],
    created_at: 0,
  }
}

export function serializeEvent(evt) {
  return JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content])
}

export function getEventHash(event) {
  let eventHash = createHash('sha256')
    .update(Buffer.from(serializeEvent(event)))
    .digest()
  return Buffer.from(eventHash).toString('hex')
}

export function validateEvent(event) {
  if (event.id !== getEventHash(event)) return false
  if (typeof event.content !== 'string') return false
  if (typeof event.created_at !== 'number') return false

  if (!Array.isArray(event.tags)) return false
  for (let i = 0; i < event.tags.length; i++) {
    let tag = event.tags[i]
    if (!Array.isArray(tag)) return false
    for (let j = 0; j < tag.length; j++) {
      if (typeof tag[j] === 'object') return false
    }
  }

  return true
}

export function verifySignature(event) {
  const thefuck = Buffer.from(event.pubkey, 'hex')
  console.log('pubkey:', event.pubkey)
  console.log(thefuck)
  console.log(thefuck.byteLength)
  console.log(thefuck.length)
  try {
    schnorr.verify(
      Buffer.from(event.pubkey, 'hex'),
      Buffer.from(event.id, 'hex'),
      Buffer.from(event.sig, 'hex')
    )
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const signEvent = async (event, key) => {
  const wat = validateEvent(event)
  console.log('WAT:', wat)

  const eventHash = getEventHash(event)
  const eventBuffer = Buffer.from(eventHash, 'hex')
  // console.log('whats this:', await schnorr.sign(key, eventBuffer))
  const signatureBuffer = await schnorr.sign(key, eventBuffer)
  // return Buffer.from(await schnorr.sign(key, eventBuffer)).toString('hex')
  console.log(signatureBuffer)
  const sig = signatureBuffer.toString('hex')
  console.log(sig)
  return sig
}
