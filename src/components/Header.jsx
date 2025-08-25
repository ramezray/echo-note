import FeatureGrid from "./FeatureGrid.jsx";
import React from "react";

const Header = () => (
    <div className="bg-gradient-to-r from-indigo-900 text-white p-6 text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white bg-clip-text text-transparent">
            <img src="/EchoNote.svg" alt="Echo Note Logo" className="inline-block w-12 h-12 mr-2" />
            Echo Note
        </h1>
        <p className="text-xl text-indigo-100 font-medium border-t border-indigo-400/30 inline-block pt-2">
            AI-Powered Speech Transcription
        </p>
        <FeatureGrid />
    </div>
);
export default Header;
