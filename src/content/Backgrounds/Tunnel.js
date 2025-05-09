import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Tunnel = ({
  backgroundColor = '#141414',
  wireColor = '#FFFFFF',
  smoothness = 1.0,
  gridDensity = 26.0,
  noiseScale = 10.0,
  noiseSpeed = 0.5,
  noiseStrength = 0.15,
  enableDisplacement = false,
  animationDuration = 10,
  width = '100%',
  height = '100vh'
}) => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Early return if ref not attached
    if (!mountRef.current) return;
    
    // Clear any previous content
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    // Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5; // Start a bit back to see the tunnel entrance

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(backgroundColor));
    mountRef.current.appendChild(renderer.domElement);

    // Shader Uniforms
    const uniforms = {
      uSmoothness: { value: smoothness },
      uGridDensity: { value: gridDensity },
      uNoiseScale: { value: noiseScale },
      uNoiseSpeed: { value: noiseSpeed },
      uNoiseStrength: { value: noiseStrength },
      uEnableDisplacement: { value: enableDisplacement },
      uTime: { value: 0.0 },
      uWireColor: { value: new THREE.Color(wireColor) },
      uBaseColor: { value: new THREE.Color(backgroundColor) }
    };

    // Wireframe Shader Material with Toggleable Perlin Noise
    const wireframeMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uSmoothness;
        uniform float uGridDensity;
        uniform float uNoiseScale;
        uniform float uNoiseSpeed;
        uniform float uNoiseStrength;
        uniform bool uEnableDisplacement;
        uniform float uTime;
        uniform vec3 uWireColor;
        uniform vec3 uBaseColor;

        varying vec2 vUv;

        // Simple Perlin Noise Function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          vec2 u = f * f * (3.0 - 2.0 * f);

          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          // Generate grid lines
          vec2 grid = abs(fract(vUv * uGridDensity - 0.5) - 0.5);
          vec2 gridWidth = fwidth(vUv * uGridDensity);
          float lineX = smoothstep(0.0, gridWidth.x * uSmoothness, grid.x);
          float lineY = smoothstep(0.0, gridWidth.y * uSmoothness, grid.y);
          float line = 1.0 - min(lineX, lineY);

          // Perlin noise for displacement
          float noiseValue = 0.0;
          if (uEnableDisplacement) {
            noiseValue = noise(vUv * uNoiseScale + uTime * uNoiseSpeed) * uNoiseStrength;
          }

          // Combine base color and wireframe with noise distortion
          vec3 finalColor = mix(uBaseColor, uWireColor, line);
          finalColor += noiseValue; // Add noise if enabled

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide
    });

    // Tunnel Path and Tube
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(3, 2, -20),
      new THREE.Vector3(-3, -2, -30),
      new THREE.Vector3(0, 0, -40),
      new THREE.Vector3(2, 1, -50),
      new THREE.Vector3(-2, -1, -60),
      new THREE.Vector3(0, 0, -70),
    ]);

    const geometry = new THREE.TubeGeometry(path, 300, 2, 32, false);
    const tube = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(tube);

    // Mouse Movement - Camera Shake
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Variables for camera animation
    let currentPosition = 0;
    const speed = 0.001 * (10 / animationDuration); // Adjust by animation duration

    // Animation Loop
    const animate = () => {
      // Update time uniform for animated noise
      uniforms.uTime.value += 0.01;
      
      // Move camera along the path
      currentPosition = (currentPosition + speed) % 1;
      const camPos = path.getPointAt(currentPosition);
      const lookAtPos = path.getPointAt((currentPosition + 0.01) % 1);
      
      // Add mouse shake
      const shakeX = mouse.x * 0.3;
      const shakeY = mouse.y * 0.3;
      
      camera.position.set(
        camPos.x + shakeX,
        camPos.y + shakeY,
        camPos.z
      );
      camera.lookAt(lookAtPos);
      
      // Render the scene
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Window Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, [
    backgroundColor,
    wireColor,
    smoothness,
    gridDensity,
    noiseScale,
    noiseSpeed,
    noiseStrength,
    enableDisplacement,
    animationDuration
  ]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width, 
        height, 
        backgroundColor,
        overflow: 'hidden'
      }}
    />
  );
};


export default Tunnel;