import { Copy, Download } from "lucide-react";

const FooterActions = ({ sessionStartTime, copyToClipboard, exportToFile }) => (
    <div className="p-8 bg-gray-50 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
        <div className="text-gray-600 font-medium">
            {sessionStartTime ? `Session started: ${sessionStartTime.toLocaleTimeString()}` : "Ready to start transcription"}
        </div>
        <div className="flex gap-3">
            <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:brightness-110 hover:scale-105 transition-transform"
            >
                <Copy className="w-4 h-4" /> Copy
            </button>
            <button onClick={exportToFile} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" /> Export TXT
            </button>
        </div>
    </div>
);
export default FooterActions;