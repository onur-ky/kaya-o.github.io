window.onload = function (){
	console.log("asd");
	// Constants
	const dnaHeight = 900;
	const radiusEdges = 3;
	const variationAngle = 0.1;
	const unionGap = 7;
	const edgeSize = 0.3;
	const verticalSeparation = edgeSize;
	const DNA = new THREE.Group();

	// Canvas
	const canvas = document.querySelector("#dna");
	console.log(canvas);

	// Scene
	const scene = new THREE.Scene();

	// Objects
	const createDNAFragment = (hasBlade, index) => {
	const dnaFragment = new THREE.Group();
	const firstEdge = new THREE.Mesh(
		new THREE.SphereGeometry(0.3, 16, 16),
		new THREE.MeshBasicMaterial({ color: `rgb(255, 255, 255)` })
	);
	const secondEdge = new THREE.Mesh(
		new THREE.SphereGeometry(0.3, 16, 16),
		new THREE.MeshBasicMaterial({ color: `rgb(255 , 255, 255)` })
	);
	firstEdge.position.x = radiusEdges * Math.sin(index * variationAngle);
	firstEdge.position.z = radiusEdges * Math.cos(index * variationAngle);
	firstEdge.position.y = verticalSeparation * index;
	secondEdge.position.x = -radiusEdges * Math.sin(index * variationAngle);
	secondEdge.position.z = -radiusEdges * Math.cos(index * variationAngle);
	secondEdge.position.y = verticalSeparation * index;

	dnaFragment.add(firstEdge);
	dnaFragment.add(secondEdge);

	if (hasBlade) {
		const blade = new THREE.Group();
		const firstBlade = new THREE.Mesh(
		new THREE.BoxGeometry(edgeSize, edgeSize, radiusEdges),
		new THREE.MeshBasicMaterial({ color: `rgb(255, 255, 255)` })
		);

		firstBlade.position.y = verticalSeparation * index;
		firstBlade.position.z = radiusEdges / 2;

		const secondBlade = new THREE.Mesh(
		new THREE.BoxGeometry(edgeSize, edgeSize, radiusEdges),
		new THREE.MeshBasicMaterial({ color: `rgb(255 , 255, 255)` })
		);

		secondBlade.position.y = verticalSeparation * index;
		secondBlade.position.z = -radiusEdges / 2;

		blade.add(firstBlade);
		blade.add(secondBlade);

		blade.rotateY(index * variationAngle);

		dnaFragment.add(blade);
	}

	// fragments = [...fragments, dnaFragment];
	DNA.add(dnaFragment);
	};

	for (let i = 0; i < dnaHeight; i++) {
	createDNAFragment(i % unionGap == 0, i);
	}

	scene.add(DNA);

	// Sizes
	const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
	};

	// Camera
	const camera = new THREE.PerspectiveCamera(75, (sizes.width) / sizes.height);
	camera.position.x = 0;
	camera.position.z = 20;
	camera.position.y = 40;
	camera.lookAt(new THREE.Vector3(0, 80, 0));
	camera.rotateZ(Math.PI / 4.5);
	scene.add(camera);

	// Renderer
	const renderer = new THREE.WebGLRenderer({
	alpha: true,
	canvas: canvas
	});
	renderer.setSize(sizes.width, sizes.height);
	renderer.render(scene, camera);

	// //Time
	let time = Date.now();

	// Animations
	const draw = () => {
	// 1. Delta Time
	const currentTime = Date.now();
	const deltaTime = currentTime - time;
	time = currentTime;
	DNA.rotateY(deltaTime * 0.001);
	renderer.render(scene, camera);
	window.requestAnimationFrame(draw);
	};

	draw();
}

