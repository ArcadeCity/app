import create from 'zustand'

interface State {
  cameraPosition: any
  cameraRotation: any
  setCameraPosition: (pos: any) => void
  setCameraRotation: (rot: any) => void
}

export const useStore = create<State>((set) => ({
  cameraPosition: [0, 0, 0],
  cameraRotation: [0, 0, 0],
  setCameraPosition: (pos: any) =>
    set({
      cameraPosition: {
        x: roundTo(pos.x, 4),
        y: roundTo(pos.y, 4),
        z: roundTo(pos.z, 4),
      },
    }),
  setCameraRotation: (rot: any) => {
    set({
      cameraRotation: {
        x: roundTo(rot.x, 4),
        y: roundTo(rot.y, 4),
        z: roundTo(rot.z, 4),
      },
    })
  },
}))

function roundTo(n: any, digits: number) {
  var negative = false
  if (digits === undefined) {
    digits = 0
  }
  if (n < 0) {
    negative = true
    n = n * -1
  }
  var multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  n = (Math.round(n) / multiplicator).toFixed(digits)
  if (negative) {
    n = (n * -1).toFixed(digits)
  }
  return n
}
