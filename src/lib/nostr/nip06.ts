/**
 * NIP 06: Key derivation from mnemonic seed
 * https://github.com/nostr-protocol/nips/blob/master/06.md
 */
import { Buffer } from 'buffer'
// import { HDKey } from '@scure/bip32'
import HDKey from 'hdkey'
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

export function privateKeyFromSeed(seed: string) {
  console.log('is...', Buffer.from(seed, 'hex'))
  let root = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
  console.log(root)
  // console.log('so')
  // const key = root.derive(`m/44'/1237'/0'/0/0`).privateKey
  // console.log('key', key)
  // if (!key) throw new Error('Failed to derive private key')
  // console.log('returning sometoihegoisndgoskng')
  // return Buffer.from(key).toString('hex')
}

export function generateSeedWords() {
  return generateMnemonic(wordlist)
}

export function seedFromWords(mnemonic: string) {
  return Buffer.from(mnemonicToSeedSync(mnemonic)).toString('hex')
}

export function validateWords(words: string) {
  return validateMnemonic(words, wordlist)
}
