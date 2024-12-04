import * as THREE from 'three';

const c = document.querySelector(".canvas");
const conW = c.clientWidth;
const conH = c.clientHeight;

// three variables:
const fov = 75; // deg.
const nearPoint = 0.1;
const farPoint = 1000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);
const camera = new THREE.PerspectiveCamera(fov, conW / conH, nearPoint, farPoint);
camera.position.z = 5; // Moved a bit to avoid overlapping camera with object.

// Camera animation:
const cameraTopLimit = 5;
const cameraBottomLimit = 12;


// Create the renderer:
const renderer = new THREE.WebGLRenderer();
renderer.setSize(conW, conH);
c.appendChild(renderer.domElement);

let sphere = null;
function addSphere() {
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    // const material = new THREE.MeshDepthMaterial({ color: 0xffd700 });
    const material = new THREE.MeshPhysicalMaterial({ color: 0x000 });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
}
addSphere();


// Text --:

// CANVAS that will be used as texture, later will be mapped:
const textCanvas = document.createElement('canvas');
const context = textCanvas.getContext('2d');
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;
context.font = '100px impact';
context.fillStyle = 'white';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText('TEXT SAMPLE', textCanvas.width / 2, textCanvas.height / 2);

// TEXTURE:
const textTexture = new THREE.CanvasTexture(textCanvas);

// 
const textGeometry = new THREE.PlaneGeometry(5, 2.5);
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
const textPlane = new THREE.Mesh(textGeometry, textMaterial);
scene.add(textPlane);
textPlane.position.set(0, 0, 5);


// ----------------------------------------------------------------
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    requestAnimationFrame(animate);
    if (sphere) {
        sphere.rotation.y += 0.01;
        sphere.rotation.x += 0.01;
    }
    renderer.render(scene, camera);
}

// Scroll:
const lenis = new Lenis({
    "autoRaf": true,
});

function handleScroll(e) {
    let update = true;

    if (e?.direction === 1) {
        if (!update) return;
        if (camera.position.z > cameraBottomLimit) {
            camera.position.z = cameraBottomLimit;
            update = false;
        } else {
            camera.position.z += 0.05;
        }
    } else {
        if (!update) return;
        if (camera.position.z < cameraTopLimit) {
            camera.position.z = cameraTopLimit;
            update = false;
        } else {
            camera.position.z -= 0.05;
        }
    }
}


animate();
window.addEventListener("resize", onWindowResize)
lenis.on("scroll", handleScroll);