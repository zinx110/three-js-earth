import { Suspense } from "react";
import styles from "../../styles/ThreeBanner.module.css";
import { Canvas } from "@react-three/fiber";
import Earth from "./earth";

const ThreeBanner = () => {
  return (
    <div className={styles.container}>
      <Canvas className={styles.canvas}>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBanner;
