import React from 'react';
import { 
    GoogleMap as MapView, 
    Marker,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';

const GoogleMaps = 
    withScriptjs(
    withGoogleMap((props) => (
        <MapView
            {...props}
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </MapView>
    )))


export default GoogleMaps;