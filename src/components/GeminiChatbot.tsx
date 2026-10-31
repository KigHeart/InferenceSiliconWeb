import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ExternalLink, Loader2, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; uri: string }[];
  searchQueries?: string[];
  timestamp: string;
}

interface GeminiChatbotProps {
  onOpenRegister?: () => void;
  onOpenProgramme?: () => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  onOpenRegister,
  onOpenProgramme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to the Advanced Inference Silicon Investors Forum (Accra 2027). I am your AI Intelligence Concierge grounded in the official forum thesis, schedule, conveners (Kiprop Yego & Dr. Michael Apasiku), and live semiconductor industry intelligence. How may I assist your delegation today?`,
      timestamp: '10:00 AM',
    },
  ]);

  const quickPrompts = [
    'What is Africa’s mineral advantage for inference chips?',
    'Who are conveners Kiprop Yego and Dr. Michael Apasiku?',
    'What are the pass tiers and early-bird deadlines?',
    'Explain the 3-day programme in Accra',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .concat(userMsg)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response generated.',
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'Unable to connect to the intelligence service at this moment. Please verify your query or explore the programme sections.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0f254e] hover:bg-[#1e3a8a] text-white shadow-2xl border border-blue-400/40 hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block leading-tight">Forum AI Concierge</span>
              <span className="text-[10px] text-blue-200">Grounded Intelligence</span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0a1931] border border-blue-800/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f254e] to-[#1e3a8a] p-4 text-white flex items-center justify-between border-b border-blue-700/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Forum Intelligence Concierge</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/30 text-blue-200 rounded-md font-mono">
                    Gemini 3.8
                  </span>
                </h3>
                <p className="text-[11px] text-blue-200/80">Accra 2027 · Search Grounded</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                title="Reset conversation"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Bar */}
          {(onOpenRegister || onOpenProgramme) && (
            <div className="bg-[#081326] px-3.5 py-1.5 border-b border-blue-900/60 flex items-center justify-between text-[11px]">
              <span className="text-blue-300 font-medium">Quick Links:</span>
              <div className="flex items-center gap-1.5">
                {onOpenProgramme && (
                  <button
                    onClick={onOpenProgramme}
                    className="px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 transition-colors cursor-pointer"
                  >
                    View Agenda
                  </button>
                )}
                {onOpenRegister && (
                  <button
                    onClick={onOpenRegister}
                    className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer"
                  >
                    Register Pass
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-[#0f254e]/90 text-blue-100 border border-blue-800/60 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Grounded Search Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-blue-700/40 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                        Grounded Sources:
                      </div>
                      <div className="space-y-1">
                        {msg.sources.slice(0, 3).map((src, i) => (
                          <a
                            key={i}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] text-blue-200 hover:text-white hover:underline truncate"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`text-[9px] ${msg.role === 'user' ? 'text-blue-200' : 'text-blue-300/70'} text-right`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#0f254e]/90 rounded-2xl p-3 border border-blue-800/60 flex items-center gap-2 text-blue-200">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Synthesizing intelligence & grounding sources...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-3 py-2 bg-[#081326] border-t border-blue-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded-full bg-blue-950 hover:bg-blue-900 border border-blue-800/60 text-[10px] text-blue-200 whitespace-nowrap transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a1931] border-t border-blue-800/60 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about forum agenda, passes, silicon chips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#0f254e] text-white text-xs px-3.5 py-2.5 rounded-xl border border-blue-700/50 focus:border-blue-400 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
