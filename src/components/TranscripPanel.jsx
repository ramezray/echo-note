import TranscriptEntry from "./TranscriptEntry.jsx";

const TranscriptPanel = ({ transcriptRef, transcriptEntries, interimText, onUpdate, onDelete }) => (
    <div className="p-8">
        <div
            ref={transcriptRef}
            className="bg-white border border-gray-200 rounded-2xl shadow-inner p-6 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar"
        >
            {transcriptEntries.length === 0 && !interimText ? (
                <div className="text-gray-400 text-center mt-20">
                    <p className="text-2xl font-medium mb-2">Your transcript will appear here...</p>
                    <p className="text-sm">Click "Start Recording" and begin speaking</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {transcriptEntries.map(entry => (
                        <TranscriptEntry key={entry.id} entry={entry} onUpdate={onUpdate} onDelete={onDelete} />
                    ))}
                    {interimText && <div className="text-indigo-500 italic">{interimText}</div>}
                </div>
            )}
        </div>
    </div>
);
export default TranscriptPanel;