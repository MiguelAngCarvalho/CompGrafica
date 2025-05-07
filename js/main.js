import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.zoomSpeed = 0.1;
controls.minDistance = 10;
controls.maxDistance = 20;

// Luz direcional
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 3, 20);
light.castShadow = true;
scene.add(light);

// Visualização da luz
const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(cameraHelper);

//Criação da Textura
const textureLoader = new THREE.TextureLoader();
const textura = textureLoader.load("textura/Fabric026_4K-JPG_Color.jpg");

// Chão
const box = new THREE.BoxGeometry(22, 10);
const material_floor = new THREE.MeshStandardMaterial({ map: textura });
const floor = new THREE.Mesh(box, material_floor);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
scene.add(floor);

// Parede
const box_2 = new THREE.BoxGeometry(22, 10);
const material_wall = new THREE.MeshStandardMaterial({ map: textura });
const wall = new THREE.Mesh(box_2, material_wall);
wall.receiveShadow = true;
wall.position.set(0, 2.5, -5);
scene.add(wall);

// Cone
const geometry_cone = new THREE.ConeGeometry(1.0, 2.0, 32);
const material_cone = new THREE.MeshStandardMaterial({ color: 0xf00ff0 });
const cone = new THREE.Mesh(geometry_cone, material_cone);
cone.castShadow = true;
cone.position.set(-4, 0, 0);
scene.add(cone);

// Esfera
const geometry_sphere = new THREE.SphereGeometry(1, 32, 32);
const material_sphere = new THREE.MeshStandardMaterial({ color:  0x00f0ff});
const sphere = new THREE.Mesh(geometry_sphere, material_sphere);
sphere.castShadow = true;
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Anel (Torus)
const geometry_torus = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material_torus = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torus = new THREE.Mesh(geometry_torus, material_torus);
torus.castShadow = true;
torus.position.set(4, 0, 0);
scene.add(torus);

// Posição da câmera
camera.position.set(0, 0, 10);

// Animações
let subindo = true;
function translacao(obj) {
  if (subindo) {
    obj.position.y += 0.01;
    if (obj.position.y >= 2) subindo = false;
  } else {
    obj.position.y -= 0.01;
    if (obj.position.y <= 0) subindo = true;
  }
}
function rotate(obj) {
  obj.rotation.x += 0.01;
  obj.rotation.y += 0.01;
}

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  rotate(cone);
  translacao(cone);

  rotate(sphere);
  translacao(sphere);

  rotate(torus);
  translacao(torus);

  renderer.render(scene, camera);
}
animate();

// Responsividade
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});