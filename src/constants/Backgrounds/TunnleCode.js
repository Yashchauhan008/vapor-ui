export const TunnleCode = {
    installation:"",
    imports:"",
    parameters:"",
    usage:`<Tunnel
  backgroundColor={"#141414"}
  wireColor={"#FFFFFF"}
  smoothness={1}
  gridDensity={26}
  noiseScale={10}
  noiseSpeed={0.5}
  noiseStrength={0}
  animationDuration={15}
  enableDisplacement={true}
/>`,
    code:`import { useRef, useEffect } from 'react';
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
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Clean up previous content if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(backgroundColor));
    container.appendChild(renderer.domElement);

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

    const wireframeMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      \`,
      fragmentShader: \`
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
          vec2 grid = abs(fract(vUv * uGridDensity - 0.5) - 0.5);
          vec2 gridWidth = fwidth(vUv * uGridDensity);
          float lineX = smoothstep(0.0, gridWidth.x * uSmoothness, grid.x);
          float lineY = smoothstep(0.0, gridWidth.y * uSmoothness, grid.y);
          float line = 1.0 - min(lineX, lineY);

          float noiseValue = 0.0;
          if (uEnableDisplacement) {
            noiseValue = noise(vUv * uNoiseScale + uTime * uNoiseSpeed) * uNoiseStrength;
          }

          vec3 finalColor = mix(uBaseColor, uWireColor, line);
          finalColor += noiseValue;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      \`,
      side: THREE.BackSide
    });

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

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation setup
    const speed = 0.001 * (10 / animationDuration);
    let currentPosition = 0;
    let animationId;

    const animate = () => {
      uniforms.uTime.value += 0.01;

      currentPosition = (currentPosition + speed) % 1;
      const camPos = path.getPointAt(currentPosition);
      const lookAtPos = path.getPointAt((currentPosition + 0.01) % 1);

      camera.position.set(
        camPos.x + mouse.x * 0.3,
        camPos.y + mouse.y * 0.3,
        camPos.z
      );
      camera.lookAt(lookAtPos);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
      
      // Remove renderer from DOM
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
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
      ref={containerRef}
      style={{
        width,
        height,
        backgroundColor,
        overflow: 'hidden'
      }}
    />
  );
};

export default Tunnel;`,
}