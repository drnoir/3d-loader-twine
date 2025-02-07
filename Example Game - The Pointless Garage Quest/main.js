
console.log('Snowman three js loading script main.js loaded');

let cachedModules = null;

window.loadThree = (function () {
    cachedModules = null; // Cache the loaded modules
    return async function () {
        if (cachedModules) {
            console.log("Three.js modules already loaded.");
            return cachedModules;
        }

        try {
            console.log("Loading Three.js and GLTFLoader...");

            // Correct import for Three.js and GLTFLoader using explicit paths
            const THREE = await import('https://unpkg.com/three@latest/build/three.module.js?module');
            const { GLTFLoader } = await import('https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js?module');

            console.log("Three.js and GLTFLoader loaded successfully!");

            // Store in cache to prevent multiple imports
            cachedModules = { THREE, GLTFLoader };
            console.log(cachedModules);
            return cachedModules;

        } catch (error) {
            console.error("Error loading Three.js modules:", error);
            throw error;
        }
    };
})();

window.loadThreeJSWithModel = async function (modelPath,backgroundTex, light, scale, posx, posy, posz, speed, custumAnim) {
    // Remove any existing WebGL content to prevent duplication
    let existingCanvas = document.querySelector("#three-container canvas");
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Ensure cached modules exist
    if (!window.loadThree || !cachedModules) {
        console.error("Three.js modules not loaded.");
        return;
    }

    const THREE = cachedModules.THREE;
    const GLTFLoader = cachedModules.GLTFLoader;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    
    const texLoader = new THREE.TextureLoader();
    // Load background image
    texLoader.load(backgroundTex, function(texture) {
        scene.background = texture;  // Set as background
    });


    // Lighting
    const ambientLight = new THREE.AmbientLight(light, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.background = new THREE.Color('black');

    // Camera and renderer setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three-container").appendChild(renderer.domElement);

    // Load the GLB model
    const clock = new THREE.Clock();
    let mixer = null; // Mixer for animations
    let animNum = null; // if custom anim 

    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene);

            // custom pos ?
            if (posx, posy, posz) {
                gltf.scene.position.set(posx, posy, posz);
            } else {
                gltf.scene.position.set(0, 0, 0);
            }

            // custom scaling ?
            if (scale) {
                gltf.scene.scale.set(scale, scale, scale);
            }
            else {
                gltf.scene.scale.set(1, 1, 1);
            }


            console.log("Model loaded:", modelPath, gltf.animations);
            // Ensure animations exist
            if (gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(gltf.scene);
                if (custumAnim>=0 &&custumAnim!=null) {
                    console.log(gltf.animations[custumAnim].name);
                    animNum = gltf.animations[custumAnim];
                    const actionCustom = mixer.clipAction(animNum);
                    actionCustom.play()
                } else
                    gltf.animations.forEach((clip) => {
                        console.log("Playing animation:", clip.name);
                        const action = mixer.clipAction(clip);
                        action.play();
                    });
            } else {
                console.warn("No animations found in model:", modelPath);
            }
        },
        undefined,
        (error) => {
            console.error("Error loading model:", error);
        }
    );

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (speed) { scene.rotation.y += speed }; // Slow rotation)
        if (mixer) mixer.update(clock.getDelta()); // Update mixer if it exists
        renderer.render(scene, camera);
    }
    animate();
};
