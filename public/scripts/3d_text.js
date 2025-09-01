import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Constants
 */
const MOLECULE_COUNT = 190;
const MOLECULE_TYPES = ['water', 'methane', 'ammonia', 'co2', 'acetic_acid'];

// Single quality level for all molecules
const GEOMETRY_DETAIL = { 
  sphereSegments: 16, 
  cylinderSegments: 8 
};

/**
 * Geometry Cache System
 */
class GeometryCache {
  constructor() {
    this.cache = new Map();
    this.stats = { hits: 0, misses: 0, created: 0 };
  }

  generateKey(type, segments, radius = 0.08, height = 1) {
    return `${type}_${segments}_${radius}_${height}`;
  }

  getSphereGeometry(segments, radius = 0.08) {
    const key = this.generateKey('sphere', segments, radius);
    
    if (this.cache.has(key)) {
      this.stats.hits++;
      return this.cache.get(key);
    }
    
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    this.cache.set(key, geometry);
    this.stats.misses++;
    this.stats.created++;
    return geometry;
  }

  getCylinderGeometry(segments, radius = 0.02, height = 1) {
    const key = this.generateKey('cylinder', segments, radius, height);
    
    if (this.cache.has(key)) {
      this.stats.hits++;
      return this.cache.get(key);
    }
    
    const geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
    this.cache.set(key, geometry);
    this.stats.misses++;
    this.stats.created++;
    return geometry;
  }

  // Get scaled sphere geometry - returns the base geometry, scaling handled by matrix
  getScaledSphereGeometry(segments) {
    // Always use base size sphere - scaling handled by transformation matrix
    return this.getSphereGeometry(segments, 0.08);
  }

  getStats() {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total * 100).toFixed(1) : 0;
    return {
      ...this.stats,
      total,
      hitRate: `${hitRate}%`,
      cacheSize: this.cache.size
    };
  }

  dispose() {
    // Dispose all cached geometries
    this.cache.forEach(geometry => {
      if (geometry.dispose) {
        geometry.dispose();
      }
    });
    this.cache.clear();
    console.log('Geometry cache disposed');
  }
}

const geometryCache = new GeometryCache();

/**
 * Merged Molecule Geometry System
 */
class MergedMoleculeGeometry {
  constructor() {
    this.moleculeGeometryCache = new Map();
    this.stats = { created: 0, cached: 0 };
  }

  createMergedMoleculeGeometry(moleculeType) {
    const key = moleculeType;
    
    if (this.moleculeGeometryCache.has(key)) {
      this.stats.cached++;
      return this.moleculeGeometryCache.get(key);
    }

    const mergedGeometry = this.buildMoleculeGeometry(moleculeType);
    
    this.moleculeGeometryCache.set(key, mergedGeometry);
    this.stats.created++;
    
    return mergedGeometry;
  }

  buildMoleculeGeometry(moleculeType) {
    const geometries = [];
    
    // Get base geometries from cache using single quality level
    const sphereGeometry = geometryCache.getSphereGeometry(GEOMETRY_DETAIL.sphereSegments);
    const cylinderGeometry = geometryCache.getCylinderGeometry(GEOMETRY_DETAIL.cylinderSegments);

    // Helper function to add atom with color
    const addAtom = (position, scale, colorIndex) => {
      const atomGeometry = sphereGeometry.clone();
      
      // Apply transformations
      const matrix = new THREE.Matrix4();
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(position);
      atomGeometry.applyMatrix4(matrix);
      
      // Set material index for each face
      const faceCount = atomGeometry.index ? atomGeometry.index.count / 3 : atomGeometry.attributes.position.count / 3;
      const materialIndices = new Array(faceCount).fill(colorIndex);
      atomGeometry.setAttribute('materialIndex', new THREE.BufferAttribute(new Float32Array(materialIndices), 1));
      
      geometries.push(atomGeometry);
    };

    // Helper function to add bond
    const addBond = (startPos, endPos) => {
      const bondGeometry = cylinderGeometry.clone();
      
      const distance = startPos.distanceTo(endPos);
      const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
      const direction = new THREE.Vector3().subVectors(endPos, startPos).normalize();
      
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      quaternion.setFromUnitVectors(up, direction);
      
      matrix.compose(midPoint, quaternion, new THREE.Vector3(1, distance, 1));
      bondGeometry.applyMatrix4(matrix);
      
      // Bond material index (4 = bond color)
      const faceCount = bondGeometry.index ? bondGeometry.index.count / 3 : bondGeometry.attributes.position.count / 3;
      const materialIndices = new Array(faceCount).fill(4);
      bondGeometry.setAttribute('materialIndex', new THREE.BufferAttribute(new Float32Array(materialIndices), 1));
      
      geometries.push(bondGeometry);
    };

    // Build molecules based on type
    switch(moleculeType) {
      case 'water': // H2O
        const oxygenPos = new THREE.Vector3(0, 0, 0);
        const waterH1Pos = new THREE.Vector3(0.2, 0.15, 0);
        const waterH2Pos = new THREE.Vector3(-0.2, 0.15, 0);
        
        addAtom(oxygenPos, 1.0, 1);    // Oxygen = index 1
        addAtom(waterH1Pos, 0.7, 2);  // Hydrogen = index 2
        addAtom(waterH2Pos, 0.7, 2);  // Hydrogen = index 2
        
        addBond(oxygenPos, waterH1Pos);
        addBond(oxygenPos, waterH2Pos);
        break;
        
      case 'methane': // CH4
        const carbonPos = new THREE.Vector3(0, 0, 0);
        addAtom(carbonPos, 1.0, 0); // Carbon = index 0
        
        const hPositions = [
          new THREE.Vector3(0.15, 0.15, 0.15), new THREE.Vector3(-0.15, -0.15, 0.15),
          new THREE.Vector3(-0.15, 0.15, -0.15), new THREE.Vector3(0.15, -0.15, -0.15)
        ];
        hPositions.forEach(pos => {
          addAtom(pos, 0.6, 2); // Hydrogen = index 2
          addBond(carbonPos, pos);
        });
        break;
        
      case 'ammonia': // NH3
        const nitrogenPos = new THREE.Vector3(0, 0, 0);
        addAtom(nitrogenPos, 1.0, 3); // Nitrogen = index 3
        
        const nhPositions = [
          new THREE.Vector3(0.18, 0.12, 0), new THREE.Vector3(-0.09, 0.12, 0.15), new THREE.Vector3(-0.09, 0.12, -0.15)
        ];
        nhPositions.forEach(pos => {
          addAtom(pos, 0.6, 2); // Hydrogen = index 2
          addBond(nitrogenPos, pos);
        });
        break;
        
      case 'co2': // CO2
        const co2CarbonPos = new THREE.Vector3(0, 0, 0);
        const co2O1Pos = new THREE.Vector3(0.25, 0, 0);
        const co2O2Pos = new THREE.Vector3(-0.25, 0, 0);
        
        addAtom(co2CarbonPos, 1.0, 0); // Carbon = index 0
        addAtom(co2O1Pos, 1.0, 1);     // Oxygen = index 1
        addAtom(co2O2Pos, 1.0, 1);     // Oxygen = index 1
        
        addBond(co2CarbonPos, co2O1Pos);
        addBond(co2CarbonPos, co2O2Pos);
        break;
        
      case 'acetic_acid': // CH3COOH
        const c1Pos = new THREE.Vector3(-0.25, 0, 0);
        const c2Pos = new THREE.Vector3(0, 0, 0);
        const aceticO1Pos = new THREE.Vector3(0.15, 0.15, 0);
        const aceticO2Pos = new THREE.Vector3(0.15, -0.15, 0);
        const aceticH1Pos = new THREE.Vector3(0.3, -0.22, 0);
        
        addAtom(c1Pos, 1.0, 0);        // Carbon = index 0
        addAtom(c2Pos, 1.0, 0);        // Carbon = index 0  
        addAtom(aceticO1Pos, 1.0, 1);  // Oxygen = index 1
        addAtom(aceticO2Pos, 1.0, 1);  // Oxygen = index 1
        addAtom(aceticH1Pos, 0.6, 2);  // Hydrogen = index 2
        
        // Always include all hydrogens for full quality
        const methylHPositions = [
          new THREE.Vector3(-0.35, 0.12, 0.1),
          new THREE.Vector3(-0.35, -0.12, 0.1),
          new THREE.Vector3(-0.35, 0, -0.2)
        ];
        methylHPositions.forEach(pos => {
          addAtom(pos, 0.6, 2); // Hydrogen = index 2
          addBond(c1Pos, pos);
        });
        
        addBond(c1Pos, c2Pos);
        addBond(c2Pos, aceticO1Pos);
        addBond(c2Pos, aceticO2Pos);
        addBond(aceticO2Pos, aceticH1Pos);
        break;
    }

    // Merge all geometries into one
    let mergedGeometry = new THREE.BufferGeometry();
    
    if (geometries.length > 0) {
      // Simple merge by combining vertex data
      const positions = [];
      const normals = [];
      const uvs = [];
      const materialIndices = [];
      
      geometries.forEach(geometry => {
        const positionAttr = geometry.attributes.position;
        const normalAttr = geometry.attributes.normal;
        const uvAttr = geometry.attributes.uv;
        const materialAttr = geometry.attributes.materialIndex;
        
        if (positionAttr) positions.push(...positionAttr.array);
        if (normalAttr) normals.push(...normalAttr.array);
        if (uvAttr) uvs.push(...uvAttr.array);
        if (materialAttr) materialIndices.push(...materialAttr.array);
      });
      
      mergedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      if (normals.length > 0) mergedGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      if (uvs.length > 0) mergedGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      if (materialIndices.length > 0) mergedGeometry.setAttribute('materialIndex', new THREE.Float32BufferAttribute(materialIndices, 1));
      
      // Clean up temporary geometries
      geometries.forEach(geo => geo.dispose());
    }

    return mergedGeometry;
  }

  getMergedMoleculeStats() {
    return {
      totalTypes: this.moleculeGeometryCache.size,
      created: this.stats.created,
      cached: this.stats.cached,
      cacheHitRate: this.stats.cached + this.stats.created > 0 
        ? `${(this.stats.cached / (this.stats.cached + this.stats.created) * 100).toFixed(1)}%` 
        : '0%'
    };
  }

  dispose() {
    this.moleculeGeometryCache.forEach(geometry => {
      if (geometry.dispose) {
        geometry.dispose();
      }
    });
    this.moleculeGeometryCache.clear();
    console.log('Merged molecule geometries disposed');
  }
}

const mergedMoleculeGeometry = new MergedMoleculeGeometry();

/**
 * Simple Molecule Manager - Individual Atom/Bond Instanced Meshes (Optimized)
 */
class SimpleMoleculeManager {
  constructor() {
    this.instancedMeshes = new Map(); // Map of atomType -> InstancedMesh
    this.instanceCounts = new Map();
    this.moleculeData = [];
    this.maxInstances = 1000; // Total instances across all atoms/bonds
    this.isDirty = new Map(); // Track which meshes need buffer updates
    this.isInitialized = false;
  }

  addMoleculeData(position, rotation, scale, moleculeType) {
    this.moleculeData.push({
      position: position.clone(),
      rotation: rotation.clone(),
      scale,
      moleculeType
    });
  }

  createInstancedMeshes() {
    // Create materials for different atoms/bonds
    const materials = {
      carbon: new THREE.MeshMatcapMaterial({ color: ATOM_COLORS.carbon, matcap: matcapTexture }),
      oxygen: new THREE.MeshMatcapMaterial({ color: ATOM_COLORS.oxygen, matcap: matcapTexture }),
      hydrogen: new THREE.MeshMatcapMaterial({ color: ATOM_COLORS.hydrogen, matcap: matcapTexture }),
      nitrogen: new THREE.MeshMatcapMaterial({ color: ATOM_COLORS.nitrogen, matcap: matcapTexture }),
      bonds: new THREE.MeshMatcapMaterial({ color: ATOM_COLORS.bond, matcap: matcapTexture })
    };

    // Create geometries
    const sphereGeometry = geometryCache.getSphereGeometry(GEOMETRY_DETAIL.sphereSegments);
    const cylinderGeometry = geometryCache.getCylinderGeometry(GEOMETRY_DETAIL.cylinderSegments);

    // Create instanced meshes for each atom type
    ['carbon', 'oxygen', 'hydrogen', 'nitrogen'].forEach(atomType => {
      const instancedMesh = new THREE.InstancedMesh(sphereGeometry, materials[atomType], this.maxInstances);
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      instancedMesh.frustumCulled = true;
      
      this.instancedMeshes.set(atomType, instancedMesh);
      this.instanceCounts.set(atomType, 0);
      this.isDirty.set(atomType, false);
      
      scene.add(instancedMesh);
    });

    // Create instanced mesh for bonds
    const bondMesh = new THREE.InstancedMesh(cylinderGeometry, materials.bonds, this.maxInstances);
    bondMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    bondMesh.frustumCulled = true;
    
    this.instancedMeshes.set('bonds', bondMesh);
    this.instanceCounts.set('bonds', 0);
    this.isDirty.set('bonds', false);
    
    scene.add(bondMesh);
  }

  addAtomInstance(atomType, position, scale, parentMatrix) {
    const mesh = this.instancedMeshes.get(atomType);
    const count = this.instanceCounts.get(atomType);
    
    if (mesh && count < mesh.count) {
      const matrix = new THREE.Matrix4();
      const scaleVector = new THREE.Vector3(scale, scale, scale);
      matrix.compose(position, new THREE.Quaternion(), scaleVector);
      
      if (parentMatrix) {
        matrix.premultiply(parentMatrix);
      }
      
      mesh.setMatrixAt(count, matrix);
      this.instanceCounts.set(atomType, count + 1);
      this.isDirty.set(atomType, true); // Mark as dirty instead of updating immediately
    }
  }

  addBondInstance(startPos, endPos, parentMatrix) {
    const mesh = this.instancedMeshes.get('bonds');
    const count = this.instanceCounts.get('bonds');
    
    if (mesh && count < mesh.count) {
      const distance = startPos.distanceTo(endPos);
      const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
      const direction = new THREE.Vector3().subVectors(endPos, startPos).normalize();
      
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      quaternion.setFromUnitVectors(up, direction);
      
      const scale = new THREE.Vector3(1, distance, 1);
      matrix.compose(midPoint, quaternion, scale);
      
      if (parentMatrix) {
        matrix.premultiply(parentMatrix);
      }
      
      mesh.setMatrixAt(count, matrix);
      this.instanceCounts.set('bonds', count + 1);
      this.isDirty.set('bonds', true); // Mark as dirty instead of updating immediately
    }
  }

  createMolecule(moleculeType, moleculeMatrix) {
    switch(moleculeType) {
      case 'water': // H2O
        const oxygenPos = new THREE.Vector3(0, 0, 0);
        const waterH1Pos = new THREE.Vector3(0.2, 0.15, 0);
        const waterH2Pos = new THREE.Vector3(-0.2, 0.15, 0);
        
        this.addAtomInstance('oxygen', oxygenPos, 1.0, moleculeMatrix);
        this.addAtomInstance('hydrogen', waterH1Pos, 0.7, moleculeMatrix);
        this.addAtomInstance('hydrogen', waterH2Pos, 0.7, moleculeMatrix);
        
        this.addBondInstance(oxygenPos, waterH1Pos, moleculeMatrix);
        this.addBondInstance(oxygenPos, waterH2Pos, moleculeMatrix);
        break;
        
      case 'methane': // CH4
        const carbonPos = new THREE.Vector3(0, 0, 0);
        this.addAtomInstance('carbon', carbonPos, 1.0, moleculeMatrix);
        
        const hPositions = [
          new THREE.Vector3(0.15, 0.15, 0.15), new THREE.Vector3(-0.15, -0.15, 0.15),
          new THREE.Vector3(-0.15, 0.15, -0.15), new THREE.Vector3(0.15, -0.15, -0.15)
        ];
        hPositions.forEach(pos => {
          this.addAtomInstance('hydrogen', pos, 0.6, moleculeMatrix);
          this.addBondInstance(carbonPos, pos, moleculeMatrix);
        });
        break;
        
      case 'ammonia': // NH3
        const nitrogenPos = new THREE.Vector3(0, 0, 0);
        this.addAtomInstance('nitrogen', nitrogenPos, 1.0, moleculeMatrix);
        
        const nhPositions = [
          new THREE.Vector3(0.18, 0.12, 0), new THREE.Vector3(-0.09, 0.12, 0.15), new THREE.Vector3(-0.09, 0.12, -0.15)
        ];
        nhPositions.forEach(pos => {
          this.addAtomInstance('hydrogen', pos, 0.6, moleculeMatrix);
          this.addBondInstance(nitrogenPos, pos, moleculeMatrix);
        });
        break;
        
      case 'co2': // CO2
        const co2CarbonPos = new THREE.Vector3(0, 0, 0);
        const co2O1Pos = new THREE.Vector3(0.25, 0, 0);
        const co2O2Pos = new THREE.Vector3(-0.25, 0, 0);
        
        this.addAtomInstance('carbon', co2CarbonPos, 1.0, moleculeMatrix);
        this.addAtomInstance('oxygen', co2O1Pos, 1.0, moleculeMatrix);
        this.addAtomInstance('oxygen', co2O2Pos, 1.0, moleculeMatrix);
        
        this.addBondInstance(co2CarbonPos, co2O1Pos, moleculeMatrix);
        this.addBondInstance(co2CarbonPos, co2O2Pos, moleculeMatrix);
        break;
        
      case 'acetic_acid': // CH3COOH
        const c1Pos = new THREE.Vector3(-0.25, 0, 0);
        const c2Pos = new THREE.Vector3(0, 0, 0);
        const aceticO1Pos = new THREE.Vector3(0.15, 0.15, 0);
        const aceticO2Pos = new THREE.Vector3(0.15, -0.15, 0);
        const aceticH1Pos = new THREE.Vector3(0.3, -0.22, 0);
        
        this.addAtomInstance('carbon', c1Pos, 1.0, moleculeMatrix);
        this.addAtomInstance('carbon', c2Pos, 1.0, moleculeMatrix);
        this.addAtomInstance('oxygen', aceticO1Pos, 1.0, moleculeMatrix);
        this.addAtomInstance('oxygen', aceticO2Pos, 1.0, moleculeMatrix);
        this.addAtomInstance('hydrogen', aceticH1Pos, 0.6, moleculeMatrix);
        
        const methylHPositions = [
          new THREE.Vector3(-0.35, 0.12, 0.1),
          new THREE.Vector3(-0.35, -0.12, 0.1),
          new THREE.Vector3(-0.35, 0, -0.2)
        ];
        methylHPositions.forEach(pos => {
          this.addAtomInstance('hydrogen', pos, 0.6, moleculeMatrix);
          this.addBondInstance(c1Pos, pos, moleculeMatrix);
        });
        
        this.addBondInstance(c1Pos, c2Pos, moleculeMatrix);
        this.addBondInstance(c2Pos, aceticO1Pos, moleculeMatrix);
        this.addBondInstance(c2Pos, aceticO2Pos, moleculeMatrix);
        this.addBondInstance(aceticO2Pos, aceticH1Pos, moleculeMatrix);
        break;
    }
  }

  // Initialize all molecules (called once during setup)
  initializeMolecules() {
    if (this.isInitialized) return;
    
    // Reset all instance counts
    this.instanceCounts.forEach((_, key) => {
      this.instanceCounts.set(key, 0);
      this.isDirty.set(key, false);
    });

    // Process each molecule
    this.moleculeData.forEach(moleculeData => {
      // Create transformation matrix
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion().setFromEuler(moleculeData.rotation);
      const scaleVector = new THREE.Vector3(moleculeData.scale, moleculeData.scale, moleculeData.scale);
      matrix.compose(moleculeData.position, quaternion, scaleVector);

      // Create molecule using instanced atoms/bonds
      this.createMolecule(moleculeData.moleculeType, matrix);
    });

    // Finalize all buffers
    this.flushUpdates();
    this.isInitialized = true;
  }

  // Only update buffers that are marked as dirty
  flushUpdates() {
    this.instancedMeshes.forEach((mesh, key) => {
      if (this.isDirty.get(key)) {
        const count = this.instanceCounts.get(key);
        mesh.count = count;
        mesh.instanceMatrix.needsUpdate = true;
        this.isDirty.set(key, false); // Clear dirty flag
      }
    });
  }

  // Legacy method for compatibility - now optimized
  updateInstances() {
    if (!this.isInitialized) {
      this.initializeMolecules();
    } else {
      this.flushUpdates(); // Only update dirty buffers
    }
  }

  // Force update all buffers (use sparingly)
  forceUpdateAll() {
    this.instancedMeshes.forEach((mesh, key) => {
      const count = this.instanceCounts.get(key);
      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
    });
    this.isDirty.forEach((_, key) => {
      this.isDirty.set(key, false);
    });
  }

  getStats() {
    const dirtyMeshes = Array.from(this.isDirty.entries()).filter(([_, isDirty]) => isDirty).map(([key, _]) => key);
    
    return {
      totalMeshes: this.instancedMeshes.size,
      totalMolecules: this.moleculeData.length,
      instanceCounts: Object.fromEntries(this.instanceCounts),
      isInitialized: this.isInitialized,
      dirtyMeshes,
      needsUpdate: dirtyMeshes.length > 0
    };
  }

  // Check if any buffers need updating
  hasUpdates() {
    return Array.from(this.isDirty.values()).some(isDirty => isDirty);
  }
}

const simpleMoleculeManager = new SimpleMoleculeManager();

// Color dictionary for atoms
const ATOM_COLORS = {
  carbon: 0x333333,     // Dark gray/black
  oxygen: 0xff4444,     // Red
  hydrogen: 0xffffff,   // White
  nitrogen: 0x4444ff,   // Blue
  bond: 0x666666,       // Gray
  ionic_bond: 0x888888  // Light gray
};


/**
 * Fonts
 */
function generateMoleculeData(textGeometry) {
  // Calculate text bounding box for collision avoidance
  const textBox = {
    minX: textGeometry.boundingBox.min.x - 0.5,
    maxX: textGeometry.boundingBox.max.x + 0.5,
    minY: textGeometry.boundingBox.min.y - 0.5,
    maxY: textGeometry.boundingBox.max.y + 0.5,
    minZ: textGeometry.boundingBox.min.z - 0.5,
    maxZ: textGeometry.boundingBox.max.z + 0.5,
  };

  let placedCount = 0;

  for (let i = 0; i < MOLECULE_COUNT * 2; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;

    // Skip if position intersects with text bounding box
    if (
      x > textBox.minX &&
      x < textBox.maxX &&
      y > textBox.minY &&
      y < textBox.maxY &&
      z > textBox.minZ &&
      z < textBox.maxZ
    )
      continue;

    // Select random molecule type
    const moleculeType = MOLECULE_TYPES[Math.floor(Math.random() * MOLECULE_TYPES.length)];
    
    // Create transformation data
    const position = new THREE.Vector3(x, y, z);
    const rotation = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    const scale = Math.random() * 0.8 + 0.6;

    // Store molecule data
    simpleMoleculeManager.addMoleculeData(position, rotation, scale, moleculeType);

    placedCount++;
    if (placedCount >= MOLECULE_COUNT) break;
  }
}

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Initialize simple molecule system with instanced meshes
  simpleMoleculeManager.createInstancedMeshes();
  
  const textGeometry = new TextGeometry("Molecules", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center();
  
  const textMaterial = new THREE.MeshMatcapMaterial({
    color: 0x50b4f2,
    matcap: matcapTexture,
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);

  // Generate molecule data
  generateMoleculeData(textGeometry);
  
  // Update instances to place all molecules
  simpleMoleculeManager.updateInstances();
  
  // Log stats
  console.log('Simple Molecule Manager Stats:', simpleMoleculeManager.getStats());
  console.log('Geometry Cache Stats:', geometryCache.getStats());
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  // Dispose geometry cache
  geometryCache.dispose();
  
  // Dispose merged molecule geometries
  mergedMoleculeGeometry.dispose();
  
  // Dispose renderer
  if (renderer) {
    renderer.dispose();
  }
  
  // Log final stats
  console.log('Final Geometry Cache Stats:', geometryCache.getStats());
  console.log('Final Merged Molecule Stats:', mergedMoleculeGeometry.getMergedMoleculeStats());
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// Detect mobile device
const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Set camera position based on device
if (isMobile) {
  camera.position.x = 3;
  camera.position.y = 3;
  camera.position.z = 8;
} else {
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;
}
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x16213e);

// Enable frustum culling
camera.updateProjectionMatrix();
renderer.autoClear = true;

/**
 * Animate
 */
let frameCount = 0;
let lastStatsLogFrame = 0;
const STATS_LOG_INTERVAL = 3000; // Log stats every 3000 frames (about 50 seconds at 60fps)

const tick = () => {
  frameCount++;
  
  // Update controls
  controls.update();

  // Periodic cache stats logging
  if (frameCount - lastStatsLogFrame >= STATS_LOG_INTERVAL) {
    // Flush any pending updates before logging stats
    if (simpleMoleculeManager.hasUpdates()) {
      simpleMoleculeManager.flushUpdates();
      console.log('Flushed pending instance buffer updates');
    }
    
    console.log('Geometry Cache Performance:', geometryCache.getStats());
    console.log('Simple Molecule Manager Stats:', simpleMoleculeManager.getStats());
    lastStatsLogFrame = frameCount;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
