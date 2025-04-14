import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef(null);
  const hoverDivRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const mixerRef = useRef(null);
  const characterRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isInitializedRef = useRef(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (isInitializedRef.current || !canvasDiv.current) return;
    isInitializedRef.current = true;
    
    console.log("Scene mounting");
    const scene = sceneRef.current;
    
    let rect = canvasDiv.current.getBoundingClientRect();
    let container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone = null;
    let screenLight = null;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    let progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    // Load character
    loadCharacter().then((gltf) => {
      if (gltf) {
        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          animations.hover(gltf, hoverDivRef.current);
        }
        
        mixerRef.current = animations.mixer;
        
        const character = gltf.scene;
        characterRef.current = character;
        scene.add(character);
        
        headBone = character.getObjectByName("spine006") || null;
        screenLight = character.getObjectByName("screenlight") || null;
        
        progress.loaded().then(() => {
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
      }
    });

    // Event handlers
    const onMouseMove = (event) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    
    let debounce;
    const onTouchStart = (event) => {
      const element = event.target;
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", touchMoveHandler);
      }, 200);
    };

    const touchMoveHandler = (e) => {
      handleTouchMove(e, (x, y) => (mouse = { x, y }));
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    // Setup resize handler
    const resizeHandler = () => {
      if (characterRef.current) {
        handleResize(renderer, camera, canvasDiv, characterRef.current);
      }
    };
    window.addEventListener("resize", resizeHandler);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      
      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      clearTimeout(debounce);
      
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resizeHandler);
      
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
        landingDiv.removeEventListener("touchmove", touchMoveHandler);
      }
      
      if (rendererRef.current && canvasDiv.current) {
        canvasDiv.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;