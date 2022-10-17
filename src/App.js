import './App.css';
import React, {useState, useLayoutEffect, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, setCenter } from 'react-leaflet';
import { Icon } from "leaflet";
import * as parkData from "./data/skateboard-parks.json";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";
import iconPng from './icon.png'


function MyComponent() {


    
  const icon = L.icon({
    iconSize: [45, 45],
    popupAnchor: [2, -50],
    iconUrl: iconPng
  });

  const [center, setCenter] = useState([0, 0]);
  const [oldCenter, setOldCenter] = useState([0, 0]);
  const map = useMap()
  
  useEffect(() => {
    const interval = setInterval(() => {
          fetch('http://35.239.54.234:8081/')
          .then(res => res.json())
          .then( response => {
            const coordiantes = response[0];

            if (oldCenter[1] !== coordiantes.latitude && oldCenter[0] !== coordiantes.latitude){
              setCenter([parseFloat(coordiantes.latitude)+Math.floor(Math.random() * 300)/100000.0, parseFloat(coordiantes.longitude) ])
            }
                // map.setView([parseFloat(coordiantes.latitude),parseFloat(coordiantes.longitude)]);
                // setCenter([parseFloat(coordiantes.latitude),parseFloat(coordiantes.longitude)]);
          })
          
        }, 10000); // every 5 seconds
      
      
  },[]);

  return (
    <LeafletTrackingMarker 
      //icon={icon} 
      position={center} 
      previousPosition={oldCenter} 
      duration={5000} 
      keepAtCenter={true}/>
  )
}



function App() {

  return (
    <MapContainer center={[50.5, 30.5]} zoom={20} scrollWheelZoom={false}>
      <MyComponent/>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
    </MapContainer>
  );
}

export default App;
