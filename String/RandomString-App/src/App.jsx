import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [stringLength, setStringLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedString, setGeneratedString] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const generateRandomString = useCallback(() => {
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (characters === '') {
      setGeneratedString('Please select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < stringLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setGeneratedString(result);
    setHistory(prev => [result, ...prev].slice(0, 5));
    setCopied(false);
  }, [stringLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateRandomString();
  }, []);

  const copyToClipboard = useCallback(() => {
    if (generatedString && generatedString !== 'Please select at least one option') {
      navigator.clipboard.writeText(generatedString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedString]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Random String Generator</h1>
          <p>Create secure random strings with custom options</p>
        </header>

        <div className="output-section">
          <div className="generated-string">
            {generatedString || 'Click generate to create a string'}
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={generateRandomString}>
              Generate
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={copyToClipboard}
              disabled={!generatedString || generatedString === 'Please select at least one option'}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="controls">
          <div className="control-group">
            <label htmlFor="length">String Length: {stringLength}</label>
            <input
              type="range"
              id="length"
              min="4"
              max="50"
              value={stringLength}
              onChange={(e) => setStringLength(Number(e.target.value))}
            />
          </div>

          <div className="options-grid">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span>Uppercase (A-Z)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span>Lowercase (a-z)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span>Numbers (0-9)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span>Symbols (!@#$...)</span>
            </label>
          </div>
        </div>

        {history.length > 0 && (
          <div className="history">
            <h3>Recent Strings</h3>
            <div className="history-list">
              {history.map((str, index) => (
                <div key={index} className="history-item">
                  {str}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;