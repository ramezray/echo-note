import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Header from "./components/Header";
import FeatureGrid from "./components/FeatureGrid";
import StatusBar from "./components/StatusBar";
import Alerts from "./components/Alerts";
import TranscriptPanel from "./components/TranscripPanel.jsx"
import FooterActions from "./components/FooterActions";
import './index.css';
import AppLayout from "../AppLayout.jsx";
import Controls from "./components/Controls.jsx";

const SpeechTranscriptionApp = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcriptEntries, setTranscriptEntries] = useState([]);
    const [interimText, setInterimText] = useState('');
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [browserSupported, setBrowserSupported] = useState(true);

    const recognitionRef = useRef(null);
    const transcriptRef = useRef(null);

    useEffect(() => {
        const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        setBrowserSupported(isSupported);
        if (!isSupported) {
            setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
        }
    }, []);

    useEffect(() => {
        const allText = transcriptEntries.map(entry => entry.text).join(' ');
        const words = allText.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(allText.trim() ? words.length : 0);
    }, [transcriptEntries]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const startRecording = useCallback(() => {
        if (!browserSupported) return;

        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsRecording(true);
                setSessionStartTime(new Date());
                setError('');
                setInterimText('');
            };

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript.trim()) {
                    const newEntry = {
                        id: Date.now(),
                        text: finalTranscript.trim(),
                        timestamp: new Date().toLocaleTimeString(),
                        createdAt: new Date()
                    };

                    setTranscriptEntries(prev => [...prev, newEntry]);
                    setInterimText('');
                } else {
                    setInterimText(interimTranscript);
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(`Recognition error: ${event.error}`);
                stopRecording();
            };

            recognition.onend = () => {
                if (isRecording) {
                    try {
                        recognition.start();
                    } catch (e) {
                        console.error('Failed to restart recognition:', e);
                        stopRecording();
                    }
                }
            };

            recognitionRef.current = recognition;
            recognition.start();

        } catch (error) {
            setError('Failed to start speech recognition: ' + error.message);
        }
    }, [browserSupported, isRecording]);

    const stopRecording = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsRecording(false);
        setInterimText('');
    }, []);

    const clearTranscript = useCallback(() => {
        setTranscriptEntries([]);
        setInterimText('');
        setError('');
        setSuccess('');
    }, []);

    const copyToClipboard = useCallback(async () => {
        if (transcriptEntries.length === 0) {
            setError('No transcript to copy');
            return;
        }

        const text = transcriptEntries
            .map(entry => `${entry.text}`)
            .join('\n\n');

        try {
            await navigator.clipboard.writeText(text);
            setSuccess('Transcript copied to clipboard!');
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    }, [transcriptEntries]);

    const exportToFile = useCallback(() => {
        if (transcriptEntries.length === 0) {
            setError('No transcript to export');
            return;
        }

        const text = transcriptEntries
            .map(entry => `[${entry.timestamp}] ${entry.text}`)
            .join('\n\n');

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcript_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setSuccess('Transcript exported successfully!');
    }, [transcriptEntries]);

    const updateTranscriptEntry = useCallback((id, newText) => {
        setTranscriptEntries(prev =>
            prev.map(entry =>
                entry.id === id ? { ...entry, text: newText } : entry
            )
        );
    }, []);

    const deleteTranscriptEntry = useCallback((id) => {
        setTranscriptEntries(prev => prev.filter(entry => entry.id !== id));
    }, []);

    useEffect(() => {
        if (transcriptRef.current) {
            transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        }
    }, [transcriptEntries, interimText]);

    return (
        <AppLayout>
            <Header />
            <div className="p-8 bg-gray-50 border-b border-gray-200">
                <Controls {...{ startRecording, stopRecording, clearTranscript, isRecording, browserSupported }} />
            </div>
            <StatusBar isRecording={isRecording} wordCount={wordCount} />
            <Alerts error={error} success={success} />
            <TranscriptPanel transcriptRef={transcriptRef} transcriptEntries={transcriptEntries} interimText={interimText} onUpdate={updateTranscriptEntry} onDelete={deleteTranscriptEntry} />
            <FooterActions sessionStartTime={sessionStartTime} copyToClipboard={copyToClipboard} exportToFile={exportToFile} />
        </AppLayout>
    );
};

export default SpeechTranscriptionApp;