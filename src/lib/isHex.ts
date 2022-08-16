export function isHex(h) {
  var a = parseInt(h, 16)
  return a.toString(16) === h.toLowerCase()
}
