"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    camera?: THREE.PerspectiveCamera;
    cameraGroup?: THREE.Group;
    animationId?: number;
    cleanup?: () => void;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Disable Three.js on mobile devices for performance
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth < 768;
    if (isMobile) {
      return;
    }
    const canvas = canvasRef.current;
    const current = sceneRef.current;

    const parameters = {
      materialColor: "#90D5FF",
    };

    // Scene
    const scene = new THREE.Scene();
    current.scene = scene;

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
    gradientTexture.magFilter = THREE.NearestFilter;

    // Material
    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture,
    });

    const particlesMaterial = new THREE.PointsMaterial({
      color: parameters.materialColor,
      sizeAttenuation: true,
      size: 0.03,
    });

    // Geometries
    const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 16, 60);
    const octahedronGeometry = new THREE.OctahedronGeometry(0.55, 0);
    const torusKnotGeometry = new THREE.TorusKnotGeometry(0.3, 0.175, 100, 16);

    // Meshes - responsive objectsDistance (mobile is disabled above)
    const getObjectsDistance = () => {
      // Scale based on viewport width for desktop/tablet only
      if (window.innerWidth < 1600) return 6;
      return 4;
    };

    let objectsDistance = getObjectsDistance();
    const mesh1 = new THREE.Mesh(torusGeometry, material);
    mesh1.position.set(objectsDistance / 2.2, 0, 0);

    const mesh2 = new THREE.Mesh(octahedronGeometry, material);
    mesh2.position.set(-objectsDistance / 2.2, 0, 0);

    const mesh3 = new THREE.Mesh(torusKnotGeometry, material);
    mesh3.position.set(objectsDistance / 2.2, 0, 0);

    scene.add(mesh1, mesh2, mesh3);
    const sectionMeshes = [mesh1, mesh2, mesh3];

    // Particles
    const particlesCount = 200;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPosition = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      particlesPosition[i * 3] = (Math.random() - 0.5) * 10;
      particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlesPosition, 3),
    );

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lights
    const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera Group
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    current.cameraGroup = cameraGroup;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6);
    cameraGroup.add(camera);
    current.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.sortObjects = true;
    renderer.shadowMap.enabled = false;
    current.renderer = renderer;

    // Scroll handling (restored from original script)
    let scrollY = document.body.scrollTop;
    let currentSection = 0;
    let ticking = false;

    // Cache DOM elements for performance
    let cachedCompanyElements: NodeListOf<Element> | null = null;
    let cachedFirstElement: Element | null = null;
    let objectPositionsCalculated = false;

    // Function to cache DOM elements
    const cacheElements = () => {
      cachedCompanyElements = document.querySelectorAll('h2[class*="company"]');
      cachedFirstElement = cachedCompanyElements[0] || null;
    };

    // Function to update 3D object positions based on DOM elements
    const updateObjectPositions = () => {
      if (!cachedCompanyElements || !cachedFirstElement) {
        cacheElements();
        if (!cachedCompanyElements || !cachedFirstElement) return;
      }

      const firstRect = cachedFirstElement.getBoundingClientRect();
      const scrollTop = document.body.scrollTop;
      const firstElementTop = firstRect.top + scrollTop;

      cachedCompanyElements.forEach((element, index) => {
        if (sectionMeshes[index]) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementCenter = elementTop + rect.height / 2;

          // Position relative to the first element center
          const relativePosition =
            elementCenter - (firstElementTop + firstRect.height / 2);
          const yOffset = 1.5;
          // Convert to Three.js world coordinates
          const worldY =
            -(relativePosition / window.innerHeight) * objectsDistance +
            yOffset;

          sectionMeshes[index].position.y = worldY;
        }
      });

      objectPositionsCalculated = true;
    };

    const updateScroll = () => {
      // Update object positions to match DOM (only once initially)
      if (!objectPositionsCalculated) {
        updateObjectPositions();
      }

      // Find which section is in view using cached elements
      if (cachedCompanyElements) {
        const viewportCenter = scrollY + window.innerHeight / 2;
        let newSection = 0;

        cachedCompanyElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const scrollTop = document.body.scrollTop;
          const elementCenter = rect.top + scrollTop + rect.height / 2;

          if (
            Math.abs(elementCenter - viewportCenter) <
            window.innerHeight / 2
          ) {
            newSection = index;
          }
        });

        if (newSection !== currentSection) {
          currentSection = newSection;

          // Only animate if the mesh exists
          if (sectionMeshes[currentSection]) {
            gsap.to(sectionMeshes[currentSection].rotation, {
              duration: 1.5,
              ease: "power2.inOut",
              x: "+=6",
              y: "+=3",
              z: "+=1.5",
            });
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      // The body element is the actual scroll container
      scrollY = document.body.scrollTop;

      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Cursor handling (disabled)
    const cursor = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Mouse tracking disabled - no parallax effect
    };

    // Resize handling
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Update objectsDistance based on new screen size
        const newObjectsDistance = getObjectsDistance();
        if (newObjectsDistance !== objectsDistance) {
          objectsDistance = newObjectsDistance;

          // Update mesh horizontal positions
          mesh1.position.x = objectsDistance / 2;
          mesh2.position.x = -objectsDistance / 2;
          mesh3.position.x = objectsDistance / 2;
        }

        // Recalculate object positions on resize
        objectPositionsCalculated = false;
        updateObjectPositions();
      }, 100);
    };

    // Animation
    const clock = new THREE.Clock();
    let previousTime = 0;
    const meshRotationSpeedX = 0.1;
    const meshRotationSpeedY = 0.12;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    const tick = () => {
      if (!isVisible) {
        current.animationId = window.requestAnimationFrame(tick);
        return;
      }

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      const clampedDeltaTime = Math.min(deltaTime, 0.016);

      // Move camera to follow scroll position (only if positions are calculated)
      if (objectPositionsCalculated && cachedFirstElement) {
        const firstRect = cachedFirstElement.getBoundingClientRect();
        const scrollTop = document.body.scrollTop;
        const firstElementCenter =
          firstRect.top + scrollTop + firstRect.height / 2;

        // Calculate camera position relative to the scroll and first element center
        const relativeScroll = scrollY - firstElementCenter;
        const targetCameraY =
          -(relativeScroll / window.innerHeight) * objectsDistance;
        camera.position.y = targetCameraY;
      }

      // Animate meshes
      for (let i = 0; i < sectionMeshes.length; i++) {
        const mesh = sectionMeshes[i];
        mesh.rotation.x += clampedDeltaTime * meshRotationSpeedX;
        mesh.rotation.y += clampedDeltaTime * meshRotationSpeedY;
      }

      renderer.render(scene, camera);
      current.animationId = window.requestAnimationFrame(tick);
    };

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initialize object positions after DOM is ready
    setTimeout(() => {
      updateObjectPositions();
    }, 100);

    // Start animation
    tick();

    // Cleanup function
    current.cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (current.animationId) {
        cancelAnimationFrame(current.animationId);
      }

      // Dispose geometries
      torusGeometry.dispose();
      octahedronGeometry.dispose();
      torusKnotGeometry.dispose();
      particlesGeometry.dispose();

      // Dispose materials
      material.dispose();
      particlesMaterial.dispose();

      // Dispose texture
      gradientTexture.dispose();

      // Dispose renderer
      if (current.renderer) {
        current.renderer.dispose();
      }
    };

    return current.cleanup;
  }, []);

  useEffect(() => {
    return () => {
      if (sceneRef.current.cleanup) {
        sceneRef.current.cleanup();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
