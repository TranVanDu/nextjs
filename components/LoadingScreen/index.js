import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const LoadingScreen = () => {

    return (
        <div className="" style={{ height: "100vh", margin: "auto", alignItems: "center", backgroundColor: "#ffff", display: "flex", width: "100%" }} >
            <div style={{ width: "100%", textAlign: "center" }}> <FontAwesomeIcon icon={['fad', 'spinner']} spin style={{ fontSize: "60px", color: "#38C860" }} width="60px" /></div>
        </div>
    );

}

export default LoadingScreen;