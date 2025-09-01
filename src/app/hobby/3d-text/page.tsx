"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "@component/styles/3d-text.module.scss";

export const dynamic = "force-static";

export default function ThreeDTextPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current || !canvasRef.current) return;
    
    scriptLoadedRef.current = true;

    // Create import map for Three.js
    const importMap = document.createElement("script");
    importMap.type = "importmap";
    importMap.textContent = JSON.stringify({
      imports: {
        "three": "https://unpkg.com/three@0.174.0/build/three.module.js",
        "three/examples/jsm/controls/OrbitControls.js": "https://unpkg.com/three@0.174.0/examples/jsm/controls/OrbitControls.js",
        "three/examples/jsm/loaders/FontLoader.js": "https://unpkg.com/three@0.174.0/examples/jsm/loaders/FontLoader.js",
        "three/examples/jsm/Addons.js": "https://unpkg.com/three@0.174.0/examples/jsm/Addons.js"
      }
    });
    document.head.appendChild(importMap);

    // Dynamically load the 3D text script
    const script = document.createElement("script");
    script.src = "/scripts/3d_text.js";
    script.type = "module";
    script.async = true;
    
    script.onload = () => {
      console.log("3D text script loaded successfully");
    };
    
    script.onerror = () => {
      console.error("Failed to load 3D text script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script and import map on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(importMap)) {
        document.head.removeChild(importMap);
      }
      scriptLoadedRef.current = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/hobby" className={styles.back_link}>
          <ArrowLeft size={20} />
          Back to Hobbies
        </Link>
      </div>


        <canvas 
          ref={canvasRef}
          className={`webgl ${styles.canvas}`}
          style={{ 
            width: '100%', 
            height: '100%',
            display: 'block',
            background: '#16213e'
          }}
        />
        <div className={styles.controls_hint}>
          <p>Use mouse to orbit • Scroll to zoom</p>
        </div>
    </div>
  );
}