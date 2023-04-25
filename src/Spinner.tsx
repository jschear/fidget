import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

function Box(props: ThreeElements['mesh']) {
  // const ref = useRef<THREE.Mesh>(null!)
  // const [hovered, hover] = useState(false)
  // // const [clicked, click] = useState(false)
  // const [position, setPosition] = useState([0, 0, 0]);

  // const { size, viewport } = useThree();
  // const aspect = size.width / viewport.width;

  // useFrame((state, delta) => (
  //   ref.current.rotation.x += delta
  // ))

  const rigidBody = useRef<RapierRigidBody>(null);

  const bind = useDrag(
    ({ offset: [x, y], velocity, delta }) => {

      console.log("DRAG!")

      // setPosition([x / aspect, -y / aspect, z]);

      // ref.current.rotation.y += (delta[0] / 100);

      // ref.current.rotation.x += delta

      // let newMousePos = new THREE.Vector2(event.clientX, event.clientY);
      // let delta = new THREE.Vector2().subVectors(newMousePos, lastMousePos);
      // let angle = delta.length() / 2000; // adjust this value to control the rotation speed
      // mesh.rotation.y += angle * (delta.x > 0 ? 1 : -1);
      // mesh.rotation.x += angle * (delta.y > 0 ? 1 : -1);
      // let zval = (delta.y > 0 ? 0.5 : -0.5) + (delta.x > 0 ? 0.5 : -0.5)
      // mesh.rotation.z += angle * zval;

      if (rigidBody.current) {
        rigidBody.current.applyTorqueImpulse({ x: 0, y: velocity[0], z: 0 }, true)
      }
    },
  )


  useEffect(() => {
    if (rigidBody.current) {
      console.log("Hello")
      // A one-off "push"
      // rigidBody.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);

      // A continuous force
      // rigidBody.current.addForce({ x: 0, y: 10, z: 0 }, true);

      // A one-off torque rotation
      rigidBody.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 }, true);

      // A continuous torque
      // rigidBody.current.addTorque({ x: 0, y: 10, z: 0 }, true);
    }
  }, []);

  return (
    <RigidBody ref={rigidBody}
      angularDamping={1.0}>
      <mesh
        {...bind()}
      >
        <boxBufferGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody >
  );
}

export function Spinner() {
  return (
    <Canvas>
      <Suspense>
        <Physics
          gravity={[0, 0, 0]}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Physics>
      </Suspense>
    </Canvas>
  )
}