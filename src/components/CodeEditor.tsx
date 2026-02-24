import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Zap } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  language = 'javascript', 
  onChange,
  readOnly = false 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // Simulated output
    setOutput(['> Executing script...', '> Analyzing syntax...', '> Output: Success!']);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleReset = () => {
    setCode(initialCode);
    if (onChange) onChange(initialCode);
    setOutput([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] min-h-[300px] border border-slate-800 rounded-xl overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-slate-400 text-xs font-bold px-2 py-0.5 bg-slate-800 rounded uppercase tracking-wider">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button onClick={handleReset} title="Reset Code" className="p-2 text-slate-500 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative flex flex-col md:flex-row min-h-0">
        <textarea
          value={code}
          onChange={(e) => {
            const val = e.target.value;
            setCode(val);
            if (onChange) onChange(val);
          }}
          readOnly={readOnly}
          className="flex-1 p-6 bg-transparent text-blue-300 resize-none focus:outline-none scrollbar-hide font-mono leading-relaxed"
          spellCheck={false}
        />
        
        {output.length > 0 && (
          <div className="w-full md:w-64 bg-black/30 border-t md:border-t-0 md:border-l border-slate-800 p-4">
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-4 tracking-widest">
              <Terminal className="w-3 h-3" /> Console
            </div>
            <div className="space-y-2">
              {output.map((line, i) => (
                <div key={i} className="text-[11px] font-bold text-emerald-500">
                   {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="p-3 bg-[#161b22] border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-500/70">
            <Zap className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Ready to test</span>
          </div>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 rounded-lg text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Run Code'}
            <Play className="w-3 h-3 fill-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;