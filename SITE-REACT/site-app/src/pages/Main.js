
// This is Main Page of the site

// Home page is a page with posts (/posts)


import React, { useRef, useState } from 'react'

import photo from '../static/background.jpg'

import Mymodal from '../components/Mymodal'

import SignIn from '../pages/Registrtation'

import {Canvas, useFrame} from '@react-three/fiber'


import {OrbitControls} from '@react-three/drei'

import {Box} from '@react-three/drei'

import Circle from '../3d_components/box'
const Main = () => {
  return (
    
   <div style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)','height':100+'vh'}}>
      <Canvas camera={{position:[-5,2,10],fov:60}} shadows>
        <ambientLight intensity={0.9}/>
        <pointLight position={[-10,0,-20]} intensity={0.3}/>
        <pointLight position={[0,10,0]} intensity={1.5}/>
        <directionalLight>
          position={[0,10,0]}
          intensity={1.5}
          castShadow
        </directionalLight>
        <group>
          <mesh receiveShadow  rotation={[-Math.PI /2,0,0]} position={[0,-3,0]} >
            receiveShadow
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <shadowMaterial attach='material'></shadowMaterial>
          </mesh>
        </group>
        <Circle position={[-3,1,0]} scale={[1,1,1]}/>
        <Circle position={[-2.5,1,5]} scale={[1,1,1]}/>
        <Circle position={[4.5,1,-2]} scale={[1,1,1]}/>
      </Canvas>
   </div>
  )
}

export default Main

