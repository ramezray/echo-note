const AppLayout = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br p-6">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/40">
            {children}
        </div>
    </div>
);
export default AppLayout;
