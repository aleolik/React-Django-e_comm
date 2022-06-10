import React, { Suspense, useEffect } from 'react'

import error_image from '../static/error.png'

import Drone from '../3d_components/Drone'

import {OrbitControls} from '@react-three/drei'

import {Canvas} from '@react-three/fiber'

import { Loader } from '@react-three/drei'
const Notfoundpage = () => {
  return (
    <div  style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)','height':"100vh"}}>
      <Canvas className='canvas'>
        <OrbitControls enableZoom={false}/>
        <ambientLight intensity={0.3}></ambientLight>
        <directionalLight position={[-2,5,2]} intensity={1}></directionalLight>
      </Canvas>
    </div>
  )
}

export default Notfoundpage