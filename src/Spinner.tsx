import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

function SpinnerBody() {
  const rigidBody = useRef<RapierRigidBody>(null);

  const bind = useDrag(
    ({ velocity, direction, movement }) => {
      console.log(velocity, direction, movement)
      if (rigidBody.current) {
        rigidBody.current.applyTorqueImpulse({ x: movement[1] * 0.0002, y: movement[0] * 0.0002, z: 0 }, true)
      }
    },
  )

  return (
    <RigidBody
      ref={rigidBody}
      angularDamping={1.0}>
      <mesh
        {...bind()}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody >
  );
}

export function Spinner() {
  return (
    <Canvas shadows>
      <Suspense>
        <Physics gravity={[0, 0, 0]}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <SpinnerBody />
        </Physics>
      </Suspense>
    </Canvas>
  )
}