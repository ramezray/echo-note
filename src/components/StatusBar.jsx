const StatusBar = ({ isRecording, wordCount }) => (
    <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
      <span className="font-semibold text-gray-700">
        {isRecording ? "Recording..." : "Ready to record"}
      </span>
            {isRecording && (
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                    <span className="text-sm text-red-500 font-medium">LIVE</span>
                </div>
            )}
        </div>
        <div className="text-gray-600 font-medium">{wordCount} words</div>
    </div>
);

export default StatusBar;