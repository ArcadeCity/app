import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { Renderer, TextureLoader } from 'expo-three'
import {
  AmbientLight, BoxGeometry, Fog, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight,
  Scene, SpotLight
} from 'three'

export const ModelMarker = () => {
  return (
    <GLView
      style={{
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
      }}
      onContextCreate={onContextCreate}
    />
  )
}

const onContextCreate = async (gl) => {
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl
  const sceneColor = 0x6ad6f0

  // Create a WebGLRenderer without a DOM element
  const renderer = new Renderer({ gl })
  renderer.setSize(width, height)
  // renderer.setClearColor(sceneColor)

  const camera = new PerspectiveCamera(70, width / height, 0.01, 1000)
  camera.position.set(2, 5, 5)

  const scene = new Scene()
  scene.fog = new Fog(sceneColor, 1, 10000)
  // scene.add(new GridHelper(10, 10))

  const ambientLight = new AmbientLight(0x101010)
  scene.add(ambientLight)

  const pointLight = new PointLight(0xffffff, 2, 1000, 1)
  pointLight.position.set(0, 200, 200)
  scene.add(pointLight)

  const spotLight = new SpotLight(0xffffff, 0.5)
  spotLight.position.set(0, 500, 100)
  spotLight.lookAt(scene.position)
  scene.add(spotLight)

  const cube = new IconMesh()
  scene.add(cube)

  camera.lookAt(cube.position)

  function update() {
    cube.rotation.y += 0.05
    cube.rotation.x += 0.025
  }

  // Setup an animation loop
  const render = () => {
    timeout = requestAnimationFrame(render)
    update()
    renderer.render(scene, camera)
    gl.endFrameEXP()
  }
  render()
}

// function onContextCreate(gl: ExpoWebGLRenderingContext) {
//   const renderer = new Renderer({ gl })
//   console.log(renderer)
//   renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
//   // gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
//   // gl.clearColor(0, 1, 1, 1)

//   // // Create vertex shader (shape & position)
//   // const vert = gl.createShader(gl.VERTEX_SHADER)
//   // if (!vert) return
//   // gl.shaderSource(
//   //   vert,
//   //   `
//   //   void main(void) {
//   //     gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
//   //     gl_PointSize = 150.0;
//   //   }
//   // `
//   // )
//   // gl.compileShader(vert)

//   // // Create fragment shader (color)
//   // const frag = gl.createShader(gl.FRAGMENT_SHADER)
//   // if (!frag) return
//   // gl.shaderSource(
//   //   frag,
//   //   `
//   //   void main(void) {
//   //     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   //   }
//   // `
//   // )
//   // gl.compileShader(frag)

//   // // Link together into a program
//   // const program = gl.createProgram()
//   // if (!program) return
//   // gl.attachShader(program, vert)
//   // gl.attachShader(program, frag)
//   // gl.linkProgram(program)
//   // gl.useProgram(program)

//   // gl.clear(gl.COLOR_BUFFER_BIT)
//   // gl.drawArrays(gl.POINTS, 0, 1)

//   // gl.flush()
//   // gl.endFrameEXP()
// }

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        map: new TextureLoader().load(require('./icon.jpg')),
      })
    )
  }
}
