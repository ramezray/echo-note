import { Mic, Clock, Edit, Download } from "lucide-react";

const FeatureGrid = () => (
    <div className="grid grid-cols-4 md:grid-cols-2 md:grid-cols-4 gap-1 pt-4 bg-gray-40">
        <div className="group relative flex items-center justify-center p-1">
            <Mic className="w-10 h-10 text-green-600" />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-1 shadow-lg -top-12">
                Convert speech to text instantly with high accuracy
            </div>
        </div>
        <div className="group relative flex items-center justify-center p-1">
            <Clock className="w-10 h-10 text-blue-600" />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-1 shadow-lg -top-12">
                Every transcript includes precise timing information
            </div>
        </div>
        <div className="group relative flex items-center justify-center p-1">
            <Edit className="w-10 h-10 text-yellow-600" />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-1 shadow-lg -top-12">
                Edit and refine your transcripts after recording
            </div>
        </div>
        <div className="group relative flex items-center justify-center p-1">
            <Download className="w-10 h-10 text-purple-600" />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-1 shadow-lg -top-12">
                Download as TXT or copy to clipboard
            </div>
        </div>
    </div>
);

export default FeatureGrid;