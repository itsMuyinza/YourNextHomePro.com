
import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface VoiceSearchProps {
  onTranscription: (text: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is required for voice search.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              parts: [
                { text: "Transcribe the audio exactly as spoken. If no speech is found, return nothing. Just the text." },
                { inlineData: { mimeType: 'audio/webm', data: base64Data } }
              ]
            }
          ]
        });

        const text = response.text?.trim();
        if (text) onTranscription(text);
      };
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-espresso text-paper px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Listening...
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={`p-3 rounded-2xl transition-all ${
          isRecording 
          ? 'bg-red-500 text-white shadow-glow' 
          : 'bg-paper text-taupe hover:text-terracotta hover:bg-white border border-taupe/10 shadow-sm'
        }`}
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isRecording ? (
          <Square className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};
