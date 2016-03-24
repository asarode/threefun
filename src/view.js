import THREE from 'three'

let scene
let camera
let raycaster
let renderer
let mouse
let INTERSECTED
let cube

export default function main() {
  init()
  animate()
}

export function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  scene = new THREE.Scene()

  mouse = new THREE.Vector2()

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 1, 1).normalize()
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const pointLight = new THREE.PointLight(0x00ff00)
  pointLight.position.set(1, 1, 1)
  pointLight.intensity = 1
  scene.add(pointLight)

  raycaster = new THREE.Raycaster()

  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xf0f0f0)
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.sortObjects = false
  document.body.appendChild(renderer.domElement)

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('resize', onWindowResize, false)
}

export function render() {
  cube.rotation.x += 0.01
  cube.rotation.z += 0.005

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length) {
    const firstIntersect = intersects[0].object
    if (INTERSECTED != firstIntersect) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)

      INTERSECTED = firstIntersect
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
      INTERSECTED.material.emissive.setHex(0xff0000)
    }

    document.body.style.cursor = 'pointer'
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
    INTERSECTED = null

    document.body.style.cursor = 'default'
  }

  renderer.render(scene, camera)
}

export function animate() {
  requestAnimationFrame(animate)
  render()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove(e) {
  e.preventDefault();
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}
