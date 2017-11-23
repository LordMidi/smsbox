// customize
var backgroundColor = 0xc8151f;
var animationStyle = 1;

// setup stage
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.z = 2.5;
var renderer = new THREE.WebGLRenderer();
onWindowResize();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
var light = new THREE.PointLight(0xaaaaaa, .4);
light.position.set(10, 10, 10);
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( ambientLight );

// box

// texture mapping
var front = [
    new THREE.Vector2(.545, 0), // lower left corner
    new THREE.Vector2(1, 0), // lower right corner
    new THREE.Vector2(1, 1), // upper right corner
    new THREE.Vector2(.545, 1) // upper left corner
];
var back = [
    new THREE.Vector2(0, 0), // lower left corner
    new THREE.Vector2(.457, 0), // lower right corner
    new THREE.Vector2(.457, 1), // upper right corner
    new THREE.Vector2(0, 1) // upper left corner   
];
var side = [
    new THREE.Vector2(.46, 0), // lower left corner
    new THREE.Vector2(.54, 0), // lower right corner
    new THREE.Vector2(.54, 1), // upper right corner
    new THREE.Vector2(.46, 1) // upper left corner       
]

var boxGeometry = new THREE.BoxGeometry(1.5, 2, .3);
boxGeometry.faceVertexUvs[0] = [];

// right side
boxGeometry.faceVertexUvs[0][0] = [];
boxGeometry.faceVertexUvs[0][1] = [];

// left side
boxGeometry.faceVertexUvs[0][2] = [side[3], side[0], side[2]];
boxGeometry.faceVertexUvs[0][3] = [side[0], side[1], side[2]];

// top
boxGeometry.faceVertexUvs[0][4] = [];
boxGeometry.faceVertexUvs[0][5] = [];

// bottom
boxGeometry.faceVertexUvs[0][6] = [];
boxGeometry.faceVertexUvs[0][7] = [];

// front
boxGeometry.faceVertexUvs[0][8] = [front[3], front[0], front[2]];
boxGeometry.faceVertexUvs[0][9] = [front[0], front[1], front[2]];

// back
boxGeometry.faceVertexUvs[0][10] = [back[3], back[0], back[2]];
boxGeometry.faceVertexUvs[0][11] = [back[0], back[1], back[2]];

var material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('theninja.jpg'),
    color: 0xffffff
});

var box = new THREE.Mesh(boxGeometry, material);
box.rotation.x = -.05;
scene.add(box);

// box
var plasticMaterial = new THREE.MeshStandardMaterial({color: 0x222222});
var edgeBodyGeometry = new THREE.BoxGeometry(1.5, 2, .29);
var edgeBody = new THREE.Mesh(edgeBodyGeometry, plasticMaterial);
edgeBody.position.x = .01;
box.add(edgeBody);

var edgeFrontBackGeometry = new THREE.BoxGeometry(1.55, 2.08, .02);
var edgeFront = new THREE.Mesh(edgeFrontBackGeometry, plasticMaterial);
edgeFront.position.x = 0.026;
edgeFront.position.z = .135;
box.add(edgeFront);
var edgeBack = new THREE.Mesh(edgeFrontBackGeometry, plasticMaterial);
edgeBack.position.x = 0.026;
edgeBack.position.z = -.135;
box.add(edgeBack);
var edgeLeftGeometry = new THREE.BoxGeometry(0.1, 2.08, .29);
var edgeLeft = new THREE.Mesh(edgeLeftGeometry, plasticMaterial);
edgeLeft.position.x = -.6999;
box.add(edgeLeft);

// resize event
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(backgroundColor, 1);
}

// animation loop
var clock = new THREE.Clock();
function animate() {
    window.requestAnimationFrame(animate);
    var rotation;
    switch (animationStyle) {
        case 1:
            rotation = Math.sin(clock.getElapsedTime()) * Math.PI;
            break;
        default:
            rotation = clock.getElapsedTime();
    }
    box.rotation.y = rotation;
    renderer.render(scene, camera);
    
}

animate();