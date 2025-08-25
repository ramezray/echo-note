const Alerts = ({ error, success }) => (
    <div className="mx-8 mt-4 space-y-3">
        {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg shadow-sm">
                {error}
            </div>
        )}
        {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg shadow-sm">
                {success}
            </div>
        )}
    </div>
);

export default Alerts;