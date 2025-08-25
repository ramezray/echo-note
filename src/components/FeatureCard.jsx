import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200">
        <div className="flex items-center justify-center w-1 h-1 mb-1 bg-gray-100 text-indigo-600">
            {icon}
        </div>
        <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </div>
);
export default FeatureCard;