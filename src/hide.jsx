//  function to hide elements on certain pages
import {BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

function Hide({pathnamesToHide, Component}) {
    const location = useLocation().pathname;
    if (pathnamesToHide.includes(location)) {
        return null; // Hide the component
    }else{
        return Component // Show the component
    }
}

export default Hide;