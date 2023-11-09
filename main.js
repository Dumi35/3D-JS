import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

const Sizes={
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const sphereGeometry = new THREE.SphereGeometry(3,64,64) //3 is radius, 64 and 64 are x an dy segments

const sphereMaterial = new THREE.MeshStandardMaterial({
    color:"#00ff83",
    //wireframe: true
})

//using meshBasicMaterial doesn't require you to add light source

// mesh is combo of geometry and material
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
    color:"#ffffff",
})

const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial)

planeMesh.position.set(0,0,0)
planeMesh.rotation.x = -0.5 * Math.PI

const gui = new dat.GUI()

const options = {
    sphereColor: "#ffea00",
    wireframe: false
}

gui.addColor(options, "sphereColor").onChange((e )=>{
    sphereMesh.material.color.set(e)
})
gui.add(options, "wireframe").onChange((e)=>{
    sphereMesh.material.wireframe=e
})

const gridHelper = new THREE.GridHelper(30,50)
scene.add(gridHelper)

const boxGeometry = new THREE.BoxGeometry(10,5,10)
const boxMaterial = new THREE.MeshStandardMaterial({color:"red"})

const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial)
//scene.add(boxMesh)

//lights
const light = new THREE.PointLight(0xffffff,200,100) //color, intensity, distance, decay(amount light dims)
light.position.set(10,10,10)
//scene.add(light)

const dLight = new THREE.DirectionalLight(0xffffff,0.8)
dLight.position.set(10,10,10)
const dLightHelper = new THREE.DirectionalLightHelper(dLight,5)
scene.add(dLight, dLightHelper)

const camera = new THREE.PerspectiveCamera(45, Sizes.width/Sizes.height, 0.1,1000) //parameters are FOV FIELD OF VIEW in degrees, the wider the camera focal length, the more distorted the image looks, the aspect ratio of camera, that is width, then height, then near and far of camera
camera.position.set(0, 10,20)

const axesHelper = new THREE.AxesHelper(30)


scene.add(camera, axesHelper)
scene.add(sphereMesh, planeMesh)

//Renderer
const canvas = document.querySelector(".webgl") 
const renderer = new THREE.WebGL1Renderer({canvas})

renderer.setSize(Sizes.width, Sizes.height)
document.body.appendChild( renderer.domElement );
//orbit control

const orbit = new OrbitControls(camera, renderer.domElement)


function animate(){
    requestAnimationFrame(animate)
    orbit.update()
    renderer.render(scene, camera)
}

animate()

