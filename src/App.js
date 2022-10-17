import './App.css';
import React, {useState, useLayoutEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, setCenter } from 'react-leaflet';
import { Icon } from "leaflet";
import * as parkData from "./data/skateboard-parks.json";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";


function MyComponent() {
  const [center, setCenter] = useState([0, 0]);
  const [oldCenter, setOldCenter] = useState([0, 0]);
  const map = useMap()
  
  useLayoutEffect(() => {
    const interval = setInterval(() => {
          fetch('http://35.239.54.234:8081/')
          .then(res => res.json())
          .then( response => {
            const coordiantes = response[0];

            if (oldCenter[1] !== coordiantes.latitude && oldCenter[0] !== coordiantes.latitude) setOldCenter([coordiantes.latitude, coordiantes.longitude])
                // map.setView([parseFloat(coordiantes.latitude),parseFloat(coordiantes.longitude)]);
                // setCenter([parseFloat(coordiantes.latitude),parseFloat(coordiantes.longitude)]);
          })
          
        }, 5000); // every 5 seconds
      
      
  },[]);

 
  
  return <Marker position= {center}></Marker>
}

function App() {

  return (
    <MapContainer center={[50.5, 30.5]} zoom={20} scrollWheelZoom={false}>
      <MyComponent/>
      <LeafletTrackingMarker
        icon={Icon}
        position={center} 
        previousPosition={oldCenter} 
        duration={10000} >

      </LeafletTrackingMarker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
    </MapContainer>
  );
}

export default App;
