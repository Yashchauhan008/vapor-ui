import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const TunnelEffect = ({
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
    if (!mountRef.current) return;
    
    // Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 0;

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

    // GSAP Camera Animation with Mouse Shake
    let percentage = { value: 0 };
    
    const animation = gsap.to(percentage, {
      value: 1,
      duration: animationDuration,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        const p1 = path.getPointAt(percentage.value);
        const p2 = path.getPointAt((percentage.value + 0.01) % 1);

        // Add a small shake effect based on mouse movement
        const shakeX = mouse.x * 0.3;
        const shakeY = mouse.y * 0.3;

        camera.position.set(p1.x + shakeX, p1.y + shakeY, p1.z);
        camera.lookAt(p2);
      }
    });

    // Animation Loop
    const render = () => {
      uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
    };

    const animationFrameId = gsap.ticker.add(render);

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
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(animationFrameId);
      animation.kill();
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
      className="tunnel-container" 
      style={{ 
        width, 
        height, 
        backgroundColor 
      }}
    />
  );
};

export default TunnelEffect;