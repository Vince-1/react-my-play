import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Image() {
  const orthCamera = new THREE.OrthographicCamera(-500, 500, -500, 500);
  const c = useRef(null);
  useEffect(() => {
    orthCamera.position.set(0, 0, 1000);
  }, []);

  return (
    <Canvas
      // ref={c}
      // orthographic={true}
      camera={orthCamera}
    >
      <Box />
    </Canvas>
  );
}

export function Box() {
  const state = useThree((s) => s);
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <mesh>
      <boxBufferGeometry args={[100, 100, 100]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
}
