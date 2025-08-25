const TranscriptEntry = ({ entry }) => {
    return (
        <div className="pb-4 border-b border-gray-100 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 font-medium">{entry.timestamp}</span>
            </div>
            <div className="text-gray-900 leading-relaxed">{entry.text}</div>
        </div>
    );
};

export default TranscriptEntry;