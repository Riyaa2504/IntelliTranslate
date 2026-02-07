import { useState } from "react";
import axios from "axios";
import { Loader, Languages, ArrowRight, Copy, Check } from 'lucide-react';

function App() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTextTranslation = async () => {
    if (!textInput.trim() || !selectValue) return;
    
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '8760624c45mshaec66b6b8020af0p120fecjsn70fcba47f47f',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: `${textInput}`,
          source: 'en',
          target: `${selectValue}`,
          format: 'text'
        }
      };
      const response = await axios.request(options);
      setResult(response?.data?.data?.translations?.[0]?.translatedText || "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.data);
      setResult("Translation failed. Please try again.");
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 sm:p-2.5 rounded-xl">
              <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IntelliTranslate
            </h1>
          </div>
          <p className="text-center text-slate-600 text-xs sm:text-sm mt-2">
            Instant translation provided
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-100 overflow-hidden">
          {/* Translation Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-indigo-100">
            {/* Input Section */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <label className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Source Text (English)
                </label>
                <span className="text-xs sm:text-sm text-slate-500">
                  {textInput.length} characters
                </span>
              </div>
              <textarea
                name="input-text"
                placeholder="Enter text to translate..."
                className="w-full h-32 sm:h-40 lg:h-48 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                onChange={(e) => setTextInput(e.target.value)}
                value={textInput}
              />
            </div>

            {/* Output Section */}
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50/30 to-purple-50/30">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <label className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Translated Text
                </label>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <textarea
                name="output-text"
                className="w-full h-32 sm:h-40 lg:h-48 bg-white border-2 border-slate-200 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 outline-none resize-none"
                value={result}
                placeholder="Translation will appear here..."
                readOnly
              />
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Language Selector */}
              <div className="flex-1 flex items-center gap-3">
                <label htmlFor="language" className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  Translate to:
                </label>
                <select
                  id="language"
                  name="language"
                  className="flex-1 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 border-slate-200 outline-none focus:border-indigo-400 cursor-pointer text-sm sm:text-base font-medium text-slate-700 transition-all"
                  onChange={(e) => setSelectValue(e.target.value)}
                  value={selectValue}
                >
                  <option value="">Select Language</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="mr">Marathi (मराठी)</option>
                  <option value="es">Spanish (Español)</option>
                  <option value="fr">French (Français)</option>
                  <option value="de">German (Deutsch)</option>
                  <option value="ja">Japanese (日本語)</option>
                  <option value="ko">Korean (한국어)</option>
                  <option value="zh">Chinese (中文)</option>
                </select>
              </div>

              {/* Translate Button */}
              <button
                disabled={loading || !textInput.trim() || !selectValue}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 disabled:shadow-none"
                onClick={handleTextTranslation}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Translating...</span>
                  </>
                ) : (
                  <>
                    <span>Translate</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        
      </main>

      {/* Footer */}
      <footer className="text-center py-6 sm:py-8 text-xs sm:text-sm text-slate-500">
        <p>© 2026 IntelliTranslate. Powered by Google Translate API</p>
      </footer>
    </div>
  );
}

export default App;


