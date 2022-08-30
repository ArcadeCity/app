import BigInteger from 'bigi'

// We accept hex strings besides Uint8Array for simplicity
type Hex = Uint8Array | string
// Very few implementations accept numbers, we do it to ease learning curve
type PrivKey = Hex | bigint | number
// 33/65-byte ECDSA key, or 32-byte Schnorr key - not interchangeable
type PubKey = Hex | Point

const _0n = BigInteger.ZERO

const CURVE = Object.freeze({
  // Base point (x, y) aka generator point
  Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
  Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
  // Curve order, total count of valid points in the field. Verify with:
  //   console.log(CURVE.n === (2n**256n - 432420386565659656852420866394968145599n))
  n: BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141'),
})

export class Point {
  /**
   * Base point aka generator. public_key = Point.BASE * private_key
   */
  static BASE: Point = new Point(CURVE.Gx, CURVE.Gy)

  constructor(readonly x: bigint, readonly y: bigint) {}

  // Multiplies generator point by privateKey.
  static fromPrivateKey(privateKey: PrivKey) {
    return Point.BASE.multiply(normalizePrivateKey(privateKey))
  }

  /**
   * Constant time multiplication.
   * Uses wNAF method. Windowed method may be 10% faster,
   * but takes 2x longer to generate and consumes 2x memory.
   * @param scalar by which the point would be multiplied
   * @param affinePoint optional point ot save cached precompute windows on it
   * @returns New point
   */
  multiply(scalar: number | bigint, affinePoint?: Point): JacobianPoint {
    console.log('trying multiply')
    return 0
    // let n = normalizeScalar(scalar)
    // // Real point.
    // let point: JacobianPoint
    // // Fake point, we use it to achieve constant-time multiplication.
    // let fake: JacobianPoint
    // if (USE_ENDOMORPHISM) {
    //   const { k1neg, k1, k2neg, k2 } = splitScalarEndo(n)
    //   let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint)
    //   let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint)
    //   if (k1neg) k1p = k1p.negate()
    //   if (k2neg) k2p = k2p.negate()
    //   k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z)
    //   point = k1p.add(k2p)
    //   fake = f1p.add(f2p)
    // } else {
    //   const { p, f } = this.wNAF(n, affinePoint)
    //   point = p
    //   fake = f
    // }
    // // Normalize `z` for both points, but return only real one
    // return JacobianPoint.normalizeZ([point, fake])[0]
  }
}

function normalizePrivateKey(key: PrivKey): bigint {
  console.log('In normalizePrivateKey with:', key)
  let num: bigint
  if (typeof key === 'bigint') {
    console.log('0')
    num = key
  } else if (typeof key === 'number' && Number.isSafeInteger(key) && key > 0) {
    console.log('1')
    num = BigInt(key)
  } else if (typeof key === 'string') {
    console.log('2')
    if (key.length !== 64) throw new Error('Expected 32 bytes of private key')
    num = hexToNumber(key)
  } else if (isUint8a(key)) {
    console.log('3')
    if (key.length !== 32) throw new Error('Expected 32 bytes of private key')
    num = bytesToNumber(key)
  } else {
    console.log('4')
    throw new TypeError('Expected valid private key')
  }
  if (!isWithinCurveOrder(num)) throw new Error('Expected private key: 0 < key < n')
  console.log('returning num:', num)
  return num
}

// We can't do `instanceof Uint8Array` because it's unreliable between Web Workers etc
function isUint8a(bytes: Uint8Array | unknown): bytes is Uint8Array {
  return bytes instanceof Uint8Array
}

// Big Endian
function bytesToNumber(bytes: Uint8Array): bigint {
  return hexToNumber(bytesToHex(bytes))
}

function hexToNumber(hex: string): bigint {
  if (typeof hex !== 'string') {
    throw new TypeError('hexToNumber: expected string, got ' + typeof hex)
  }
  // Big Endian
  return BigInt(`0x${hex}`)
}

const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'))
function bytesToHex(uint8a: Uint8Array): string {
  if (!(uint8a instanceof Uint8Array)) throw new Error('Expected Uint8Array')
  // pre-caching improves the speed 6x
  let hex = ''
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes[uint8a[i]]
  }
  return hex
}

function isWithinCurveOrder(num: bigint): boolean {
  return _0n < num && num < CURVE.n
}
