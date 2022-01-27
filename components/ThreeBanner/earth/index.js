import React, { useRef } from "react";

// import EarthDayMap from "/assets/textures/8k_earth_daymap.jpg";
// import EarthNightMap from "/assets/textures/8k_earth_nightmap.jpg";
// import EarthNormalMap from "/assets/textures/8k_earth_normal_map.jpg";
// import EarthSpecularMap from "/assets/textures/8k_earth_specular_map.jpg";
// import EarthCloudsMap from "/assets/textures/8k_earth_clouds.jpg";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";

const Earth = (props) => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      "/assets/textures/8k_earth_daymap.jpg",
      "/assets/textures/8k_earth_normal_map.jpg",
      "/assets/textures/8k_earth_specular_map.jpg",
      "/assets/textures/8k_earth_clouds.jpg",
    ]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight color={"#f6f3ea"} position={[2, 0, 2]} intensity={1.2} />
      <Stars
        radius={300}
        depth={40}
        count={2000}
        factor={5}
        saturation={0}
        fade={true}
      />

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />

        <meshPhongMaterial specularMap={specularMap} />

        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
};

export default Earth;
