import React, { useEffect } from "react";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import {Sphere,MeshDistortMaterial,ambientLight} from '@react-three/drei'

export default function Circle( {position=[1,1,1],scale=[1,1,1] }){
    const mesh = useRef(null)
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.z = mesh.current.rotation.y += 0.03
    })
    return(
      <mesh ref={mesh} position={position}>
        <boxBufferGeometry attach='geometry' args={scale}/>
        <meshNormalMaterial attach='material'/>
      </mesh>
    )
}