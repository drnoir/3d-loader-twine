function loadScript(url, callback) {
    let script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}


loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", function () {
    console.log("Three.js loaded");

    loadScript("https://cdn.jsdelivr.net/npm/three/examples/js/loaders/GLTFLoader.js", function () {
        console.log("GLTFLoader loaded");
    });

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/controls/OrbitControls.js", function () {
        console.log("orbit controls Loader loaded");
    });


});


(function () {
    // Check if Three.js is already loaded
    if (typeof THREE === "undefined") {
        console.error("Three.js is not loaded.");
        return;
    }

    // Remove any existing WebGL content to prevent duplication
    let existingCanvas = document.querySelector("#three-container canvas");
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 500 / 200, 1, 1500);
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(500, 200);
    document.getElementById("three-container").appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.background = new THREE.Color('black');


    // Load GLTF/GLB Model
    const loader = new THREE.GLTFLoader();
    loader.setCrossOrigin("anonymous");
    loader.setWithCredentials(true); // Ensures credentials are sent for external texture URLs

    const clock = new THREE.Clock();
    let mixer;
    loader.load("robot.glb", function (gltf) {
        let model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, -800);
        model.scale.set(1, 1, 1);
        model.rotation.y = Math.PI; // Face camera

        // Initialize animation mixer
        mixer = new THREE.AnimationMixer(model);

        // Play all animations
        gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        })
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }

    animate();
    camera.position.set(0, 2, 5);
})();