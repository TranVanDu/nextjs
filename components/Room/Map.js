import React, { } from 'react';
import { Map, Circle, GoogleApiWrapper } from 'google-maps-react';

function Maps(props) {
    const { coords } = props
    return (
        <Map
            initialCenter={coords}
            google={props.google}
            style={{
                borderRadius: "8px",
                border: "1px solid #E9ECEF",
                boxSizing: "border-box",
                height: "205px",
                position: "relative"
            }}
            zoom={14}
            containerStyle={
                {
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                }
            }
        >
            <Circle
                radius={400}
                center={coords}
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.3}
            />
        </Map >
    )
}
export default GoogleApiWrapper({ apiKey: "AIzaSyCu8u0Sj0sHDp3BEO8vvUa4JFZA5d4Hee8" })(Maps);