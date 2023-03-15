import React, { useEffect } from 'react';
import 'aframe';
import '@ar-js-org/ar.js';
import '../../styles/MyNFTScene.module.css'
import {Box} from '@mui/material'
import { red } from '@mui/material/colors';

export default function MyNFTScene() {
    useEffect(
        () =>{
             // Turn off the camera when the component unmounts
            return ()=>{
                const video = document.querySelector('#arjs-video');
                if (video) {
                    video?.srcObject?.getTracks().map((track) => track.stop());
                    video.remove();
                }
            }
        },
        [],
    );
  return (
    <Box id="arjs-cell" style={{
      textAlign: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: red[100],
      position : 'absolute',
    }}>
    
    {/* /scanner1.htm */}
    <iframe src="" style={{
      width: '60vw',
      height: '60vh',     
      position : 'relative',
      top:  'calc(50% - (60vh / 2))'
    }} ></iframe>
    </Box>
  );
}


// let marker;

// AFRAME.registerComponent('registerevents', {
//     init: function() {
//       console.log('My component was initialized');

//        marker = this.el;

//        const video = document.querySelector('#arjs-video');
//     console.log(video)

//       marker.addEventListener('markerFound', function(){
//         console.log('Marker found');

//       })
//     },
//     update: function() {
//       console.log('My component was updated');
//     },
//     tick: function() {
//       console.log('My component is ticking');
//     }
//   });    


// window.addEventListener('camera-init', function(evt){
//     console.log('camera-init')
//     const video = document.querySelector('#arjs-video');
//     console.log(evt)
// })

// "debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;trackingMethod: best; sourceWidth:1280; sourceHeight:960; canvasWidth: 640; canvasHeight: 480; "


 {/* <a-scene embedded vr-mode-ui="enabled: false;" 
     arjs="
        debugUIEnabled: false;
        detectionMode: mono_and_matrix;
        matrixCodeType: 3x3;
        trackingMethod: best;
        sourceWidth: 1280;
        sourceHeight: 960;
        displayWidth : 480;
        displayHeight : 360;
    ">
        <a-marker type="pattern" url="pattern_ss_logo_3.patt" registerevents>
            <a-box position="0 0.5 0" 
                   material="color: red; transparent: true; opacity: 0.0;">
            </a-box>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene> */}