let width=window.innerWidth;
let height=window.innerHeight;
let scene=new THREE.Scene();

let camera=new THREE.PerspectiveCamera(40, width/height, 0.01, 1000);
let render=new THREE.WebGLRenderer({
	antialias:true
});
let loader = new THREE.GLTFLoader();
function loadModel(file, callback){
	loader.load(file, callback)
}