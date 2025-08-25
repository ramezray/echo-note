import React from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';

const getButtonClassNames = ({ type, isDisabled }) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 text-white rounded-full font-semibold transform hover:scale-105 transition-all duration-200 min-w-[150px] justify-center";
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
    const typeClasses = {
        start: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600",
        stop: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
        clear: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    };

    return `${baseClasses} ${disabledClasses} ${typeClasses[type]} ${isDisabled ? "disabled" : ""}`;
};

const Controls = ({ startRecording, stopRecording, clearTranscript, isRecording, browserSupported }) => (
    <div className="flex flex-nowrap justify-center items-center gap-4 px-6 py-3">
        <button
            onClick={startRecording}
            disabled={!browserSupported || isRecording}
            className={getButtonClassNames({ type: "start", isDisabled: !browserSupported || isRecording })}
        >
            <Mic className="w-5 h-5" />
            <span className="hidden sm:block">Start Recording</span>
        </button>

        <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={getButtonClassNames({ type: "stop", isDisabled: !isRecording })}
        >
            <Square className="w-5 h-5" />
            <span className="hidden sm:block">Stop Recording</span>
        </button>

        <button
            onClick={clearTranscript}
            className={getButtonClassNames({ type: "clear", isDisabled: false })}
        >
            <Trash2 className="w-5 h-5" />
            <span className="hidden sm:block">Clear Transcript</span>
        </button>
    </div>
);

export default Controls;