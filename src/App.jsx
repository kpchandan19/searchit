
import { useState, useEffect, useRef, useCallback } from "react";

// --- HIGH-TECH UI COMPONENTS ---

function SearchIcon({ size = 28, color = "rgba(255,255,255,0.9)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SettingsIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );
}

function BrainIcon({ size = 24, color = "#8b5cf6" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
      <line x1="8" y1="22" x2="16" y2="22"></line>
    </svg>
  );
}

function TerminalIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

function ResultCard({ result, index }) {
  const [hovered, setHovered] = useState(false);
  const accents = ['#a78bfa', '#f472b6', '#22d3ee', '#34d399', '#fbbf24'];
  const accent = accents[index % accents.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="result-card fade-up"
      style={{
        padding: '36px', borderRadius: '28px', marginBottom: '28px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
        border: `1px solid ${hovered ? accent + '90' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-12px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}15` : '0 10px 30px rgba(0,0,0,0.2)',
        cursor: 'pointer', animationDelay: `${index * 0.08}s`,
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Scanline Effect on Hover */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
          backgroundSize: '100% 2px, 3px 100%', pointerEvents: 'none', zIndex: 1
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          padding: '6px 14px', background: `${accent}20`, borderRadius: '10px',
          fontSize: '11px', color: accent, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px'
        }}>
          NODE_{index.toString().padStart(3, '0')} // {result.source}
        </div>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${accent}40, transparent)` }} />
      </div>

      <h3 style={{
        fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.1,
        background: hovered ? `linear-gradient(to right, #fff, ${accent})` : 'transparent',
        WebkitBackgroundClip: hovered ? 'text' : 'none',
        WebkitTextFillColor: hovered ? 'white' : 'white'
      }}>
        {result.title}
      </h3>

      <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 12 }}>
        {result.snippet}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: accent, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: 8 }}>
          DECRYPT DATA <span style={{ transition: 'transform 0.4s' }}>→</span>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
          LATENCY: {Math.floor(Math.random() * 50 + 10)}ms
        </div>
      </div>
    </div>
  );
}

function LoreResult({ onComplete }) {
  const [text, setText] = useState("");
  const fullText = `They call him kp.
Shadow architect of beats that bruise the night, code that cuts cleaner than regret.
He built machines to map the meaningless, then stared back at the void until it blinked first.
Nothing matters. He knows it.
Yet here he is—forging dark rhythms that echo like distant gunfire, scripting automation that laughs at chaos, dropping truth bombs wrapped in bass.
No spotlight. No applause. Just the work.
Because in a universe that's already dust, the only rebellion left... is to create anyway.
Search complete.
One result found.
And it's still loading... forever.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30); // Typewriter speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rig-hum" style={{
      padding: '60px', borderRadius: '40px', background: 'rgba(0,0,0,0.6)',
      border: '1px solid rgba(139, 92, 246, 0.3)', position: 'relative',
      animation: 'lorePulse 4s infinite alternate', maxWidth: '940px', margin: '0 auto',
      overflow: 'hidden'
    }}>
      {/* BACKGROUND ASCII WATERMARK */}
      <pre className="mono-text" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: '100px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.05)',
        lineHeight: 1, letterSpacing: '4px', zIndex: 0, pointerEvents: 'none',
        animation: 'rigHum 8s infinite alternate', whiteSpace: 'pre'
      }}>
        {`
██╗  ██╗██████╗ 
██║ ██╔╝██╔══██╗
█████╔╝ ██████╔╝
██╔═██╗ ██╔═══╝ 
██║  ██╗██║     
╚═╝  ╚═╝╚═╝     
`}
      </pre>

      <pre className="mono-text" style={{
        fontSize: '16px', lineHeight: 1.8, color: '#fff', whiteSpace: 'pre-wrap',
        textShadow: '0 0 10px rgba(255,255,255,0.2)', position: 'relative', zIndex: 1
      }}>
        {text}<span className="cursor-blink">_</span>
      </pre>

      <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', opacity: 0.4 }}>
        <p className="mono-text" style={{ fontSize: '11px', fontStyle: 'italic' }}>
          *The cursor blinks once. Twice. Then the whole rig hums low, like it's nodding in approval.*
        </p>
        <p className="mono-text" style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '10px' }}>
          "Run it again tomorrow. See if the abyss updated its profile"
        </p>
      </div>
    </div>
  );
}

// --- MAIN APPLICATION ---

export default function KPSSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [history] = useState(["Neuralink 2.0", "Mars Logistics", "Web 4.0 Protocol", "Dark Fiber"]);
  const [category, setCategory] = useState("ALL");
  const [showSettings, setShowSettings] = useState(false);

  const [googleKey, setGoogleKey] = useState(() => localStorage.getItem("kp_google_key") || "");
  const [googleCx, setGoogleCx] = useState(() => localStorage.getItem("kp_google_cx") || "");
  const [tempKey, setTempKey] = useState("");
  const [tempCx, setTempCx] = useState("");
  const [isLore, setIsLore] = useState(false);

  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    "KP-SEARCH KERNEL v2.1.0-STABLE (x86_64)",
    "Initializing neural uplink... [OK]",
    "Welcome user. Type 'help' for available commands.",
    ""
  ]);

  const inputRef = useRef(null);
  const termInputRef = useRef(null);
  const termScrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === "`") {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  useEffect(() => {
    if (showTerminal && termInputRef.current) {
      termInputRef.current.focus();
    }
  }, [showTerminal]);

  useEffect(() => {
    if (termScrollRef.current) {
      termScrollRef.current.scrollTop = termScrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    setResults([]);
    setIsLore(false);

    if (q.toLowerCase() === "kp") {
      setIsLore(true);
      setLoading(false);
      return;
    }

    const generateMockData = (sq) => [
      { title: `Decentralized Indexing of ${sq}`, snippet: `A high-level technical overview of how ${sq} is being integrated into modern neural networks for hyper-fast retrieval.`, source: "matrix.io" },
      { title: `The ${sq} Paradox: Why Intelligence is Failing`, snippet: `Researchers have discovered a fundamental flaw in how ${sq} scales across distributed server farms in the 2026 update.`, source: "cyber-labs.edu" },
      { title: `Government Protocol: ${sq}_SECURE`, snippet: `Leaked documents suggest a new layer of security being built explicitly for ${sq} transactions in the European sector.`, source: "intel-leak.org" },
      { title: `Why ${sq} is the Future of UI`, snippet: `Designing immersive interfaces around the concept of ${sq} has led to a 400% increase in user retention in recent tests.`, source: "future-design.net" },
      { title: `Neural Mapping: The ${sq} Node`, snippet: `How mapping the human connectome has revealed startling similarities to the ${sq} database architecture.`, source: "brain-sync.com" },
    ];

    if (!googleKey || !googleCx) {
      setTimeout(() => { setResults(generateMockData(q)); setLoading(false); }, 1800);
      return;
    }

    try {
      const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults((data.items || []).map(item => ({ title: item.title, snippet: item.snippet, source: item.displayLink || "web" })));
    } catch (e) {
      setResults(generateMockData(q));
    }
    setLoading(false);
  }, [googleKey, googleCx]);

  const handleKeyDown = (e) => { if (e.key === "Enter") doSearch(query); };

  const handleTerminalCommand = (e) => {
    if (e.key === "Enter") {
      const fullCmd = terminalInput.trim();
      if (!fullCmd) return;

      const parts = fullCmd.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");

      setTerminalLines(prev => [...prev, `user@kp-search:~# ${fullCmd}`]);
      setTerminalInput("");

      switch (cmd) {
        case "help":
          setTerminalLines(prev => [...prev,
            "AVAILABLE COMMANDS:",
            "  search [q]  - Execute a neural search",
            "  sysinfo      - Display kernel & system specs",
            "  clear        - Flush terminal buffer",
            "  settings    - Open system config panel",
            "  exit         - Terminate shell session",
            "  help         - Display this manual"
          ]);
          break;
        case "search":
          if (!arg) {
            setTerminalLines(prev => [...prev, "ERROR: Missing search parameters. Usage: search [query]"]);
          } else {
            setTerminalLines(prev => [...prev, `INITIATING NEURAL SEARCH FOR: ${arg}...`]);
            setQuery(arg);
            doSearch(arg);
            setTimeout(() => setShowTerminal(false), 500);
          }
          break;
        case "sysinfo":
          setTerminalLines(prev => [...prev,
            "OS: KP-Search Linux v2.1 (Neural Edition)",
            "KERNEL: 6.8.0-kp-neural-gen2",
            "CPU: Neural Core i9 v12 @ 5.2GHz",
            "UPLINK: ACTIVE (G-SEARCH-CLUST)",
            "MEMORY: 128GB N-RAM",
            "USER: root (superuser)"
          ]);
          break;
        case "clear":
          setTerminalLines([]);
          break;
        case "settings":
          setTempKey(googleKey); setTempCx(googleCx); setShowSettings(true);
          setShowTerminal(false);
          break;
        case "exit":
          setShowTerminal(false);
          break;
        default:
          setTerminalLines(prev => [...prev, `ERROR: Command '${cmd}' not found. Type 'help' for manual.`]);
      }
    }
  };

  const categories = ["ALL", "NEURAL", "DATA", "INTEL", "MEDIA", "LOGS"];

  return (
    <div className="discovery-vault">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
        
        * { margin:0; padding:0; box-sizing: border-box; }
        
        body, html, #root {
          width: 100% !important; height: 100% !important;
          margin: 0 !important; padding: 0 !important;
          background: #04040a !important;
          color: #fff; overflow-x: hidden !important;
          font-family: 'Inter', sans-serif;
        }

        .discovery-vault {
          width: 100vw; min-height: 100vh;
          background: radial-gradient(circle at 50% 50%, #0d0d1a 0%, #04040a 100%);
          position: relative; display: flex; flex-direction: column; align-items: center;
        }

        /* Moving Cyber Mesh Background */
        .cyber-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background: 
            radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 60%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 60%),
            radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.15) 0px, transparent 60%),
            radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 60%);
          filter: blur(140px);
          animation: meshPulse 30s infinite alternate;
        }

        @keyframes meshPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.9; }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .fade-up { opacity: 0; animation: fadeInScale 1.2s forwards cubic-bezier(0.16, 1, 0.3, 1); }

        .search-hud {
          position: relative; width: 95vw; max-width: 1200px;
          padding: 14px; border-radius: 60px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(60px);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          margin: 0 auto;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-hud:focus-within {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05);
          transform: translateY(-8px);
          box-shadow: 0 60px 180px rgba(0,0,0,1), 0 0 40px rgba(139,92,246,0.1);
        }

        .spinning { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #4facfe, #00f2fe, #f472b6, #4facfe);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }

        @keyframes rigHum {
          0%, 100% { transform: scale(1); opacity: 0.8; filter: blur(0px); }
          50% { transform: scale(1.002); opacity: 1; filter: blur(0.5px); }
        }
        .rig-hum { animation: rigHum 4s ease-in-out infinite; }

        @keyframes lorePulse {
          0% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.1); }
          50% { box-shadow: 0 0 50px rgba(139, 92, 246, 0.3); }
          100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.1); }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .mono-text { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="cyber-mesh" />

      {/* SYSTEM HUD HEADER - ACTUAL FULL WIDTH */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '80px',
        padding: '0 3vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 100, background: searched ? 'rgba(4,4,10,0.9)' : 'transparent',
        backdropFilter: searched ? 'blur(60px)' : 'none',
        borderBottom: searched ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => { setSearched(false); setQuery(""); }}>
          <div style={{
            width: 28, height: 28, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 900, color: '#fff', boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
          }}>
            KP
          </div>
          <div>
            <span className="mono-text" style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
              SEARCH_SYS.v2
            </span>
            <p className="mono-text" style={{ fontSize: '6px', color: '#34d399', letterSpacing: '1px', transform: 'scale(0.9)', transformOrigin: 'left' }}>
              STATUS: OPTIMAL<span className="cursor-blink" style={{ marginLeft: '2px' }}>_</span>
            </p>
          </div>
        </div>

        {/* HUD Metrics */}
        <div className="mono-text" style={{ display: searched ? 'none' : 'flex', gap: 30, fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>
          <div><span style={{ color: '#8b5cf6' }}>TIME:</span> {time}</div>
          <div><span style={{ color: '#ec4899' }}>NEURAL_LOAD:</span> {(Math.random() * 100).toFixed(1)}%</div>
          <div><span style={{ color: '#06b6d4' }}>UPLINK:</span> ACTIVE</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {searched && (
            <div style={{
              width: '40vw', background: 'rgba(255,255,255,0.03)', borderRadius: '24px',
              padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <SearchIcon size={20} color="rgba(255,255,255,0.3)" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none' }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 20 }}>
            <button onClick={() => setShowTerminal(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#34d399'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}><TerminalIcon size={22} /></button>
            <button onClick={() => { setTempKey(googleKey); setTempCx(googleCx); setShowSettings(true); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2) rotate(180deg)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}><SettingsIcon size={26} /></button>
          </div>
        </div>
      </nav>

      {/* IMMERSIVE MAIN STAGE */}
      <main style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>

        {!searched ? (
          /* --- HERO VIEW: THE NEXUS --- */
          <section style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 40px', textAlign: 'center' }}>
            <div className="fade-up" style={{ animationDelay: '0.1s' }}>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 0.9, color: '#fff', marginBottom: '16px' }}>
                Navigate<br /><span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>The Matrix.</span>
              </h1>
            </div>

            <div className="search-hud fade-up" style={{ animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ padding: '0 12px' }}>
                  {loading ? <div className="spinning"><SearchIcon size={20} color="#8b5cf6" /></div> : <SearchIcon size={20} color="#8b5cf6" />}
                </div>
                <input
                  ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Input Parameters..."
                  className="mono-text"
                  style={{ flex: 1, height: '50px', background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', fontWeight: 300 }}
                />
                <button onClick={() => doSearch(query)} style={{
                  height: '50px', padding: '0 24px', borderRadius: '20px', background: '#fff', border: 'none',
                  color: '#000', fontSize: '12px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.5s'
                }} onMouseEnter={e => { e.currentTarget.style.background = '#8b5cf6'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}>
                  INIT
                </button>
              </div>
            </div>

            {/* Trending Ticker */}
            <div className="fade-up" style={{ marginTop: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 15, animationDelay: '0.4s' }}>
              {history.map(h => (
                <button key={h} onClick={() => { setQuery(h); doSearch(h); }} style={{ padding: '14px 30px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.color = '#fff'; }}>{h}</button>
              ))}
            </div>
          </section>
        ) : (
          /* --- RESULTS VIEW: FULL SCREEN EXPANSION --- */
          <section style={{ width: '100vw', maxWidth: '2400px', margin: '180px auto 100px', padding: '0 5vw', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 550px', gap: '100px' }}>

            {/* Main Result Stream */}
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '50px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
                  {categories.map(c => (
                    <button key={c} onClick={() => setCategory(c)} style={{ padding: '10px 24px', borderRadius: '14px', background: category === c ? '#8b5cf6' : 'rgba(255,255,255,0.03)', border: category === c ? 'none' : '1px solid rgba(255,255,255,0.1)', color: category === c ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s' }}>{c}</button>
                  ))}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>Nodes for <span style={{ color: '#8b5cf6' }}>"{query}"</span></h2>
                <p className="mono-text" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '6px' }}>ACCESSING_CENTRAL_INTEL // RESULTS_MAP_STABLE</p>
              </div>

              {loading ? (
                <div style={{ padding: '200px 0', textAlign: 'center' }}>
                  <div className="spinning" style={{ display: 'inline-block', width: '100px', height: '100px', border: '10px solid rgba(139, 92, 246, 0.05)', borderTop: '10px solid #8b5cf6', borderRadius: '50%' }} />
                  <p className="mono-text" style={{ marginTop: '40px', color: '#8b5cf6', fontSize: '20px', letterSpacing: '4px' }}>SYNTHESIZING_BRAIN...</p>
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  {isLore ? (
                    <LoreResult />
                  ) : (
                    results.map((r, i) => <ResultCard key={i} result={r} index={i} />)
                  )}
                </div>
              )}
            </div>

            {/* AI HUD Sidebar */}
            <aside style={{ width: '100%' }}>
              <div style={{ position: 'sticky', top: '180px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '54px', padding: '64px', backdropFilter: 'blur(70px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '20px' }}>
                  <BrainIcon size={22} />
                  <h4 style={{ fontSize: '18px', fontWeight: 900 }}>Neural Insight</h4>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                  {isLore ? (
                    <>WARNING: Restricted neural data detected. Intelligence density is <span style={{ color: '#f87171' }}>INFINTELY HIGH</span>. Accessing shadow archives for <span style={{ color: '#a78bfa' }}>{query}</span>...</>
                  ) : (
                    <>Contextual analysis indicates that <span style={{ color: '#a78bfa' }}>{query}</span> is currently trending in high-security academic clusters. Intelligence density is reaching a critical threshold.</>
                  )}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '50px' }}>
                  {(isLore ? ['SHADOW_ARCHITECT', 'K-LEVEL_INTEL', 'VOID_ECHO', 'DARK_CODE'] : ['Technical Depth', 'Market Shift', 'Node Risk', 'Global Delta']).map(t => (
                    <span key={t} className="mono-text" style={{ padding: '10px 20px', background: isLore ? 'rgba(248, 113, 113, 0.1)' : 'rgba(139, 92, 246, 0.15)', color: isLore ? '#f87171' : '#8b5cf6', borderRadius: '16px', fontSize: '12px', fontWeight: 800 }}>{t}</span>
                  ))}
                </div>

                <div style={{ padding: '40px', background: isLore ? 'linear-gradient(135deg, #111, #000)' : 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: isLore ? '1px solid #333' : 'none', borderRadius: '36px', color: '#fff', boxShadow: isLore ? '0 30px 60px rgba(0,0,0,1)' : '0 30px 60px rgba(139, 92, 246, 0.4)' }}>
                  <h5 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px' }}>{isLore ? 'LORE_EXTRACTION' : 'AI BRIEF'}</h5>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.6, marginBottom: '32px' }}>{isLore ? 'Critical metadata detected in the shadow node. Decrypting origin story...' : 'Compile all detected nodes into an executive neural summary.'}</p>
                  <button style={{ width: '100%', padding: '20px', background: isLore ? '#f87171' : '#fff', border: 'none', borderRadius: '20px', color: isLore ? '#fff' : '#000', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>{isLore ? 'SOURCE_ORIGIN' : 'INITIATE SUMMARY'}</button>
                </div>
              </div>
            </aside>
          </section>
        )}
      </main>

      {/* SYSTEM CONFIG PANEL */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(60px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowSettings(false)}>
          <div style={{ width: '90vw', maxWidth: '700px', padding: '80px', borderRadius: '64px', background: '#08081a', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 80px 250px rgba(0,0,0,1)' }} onClick={e => e.stopPropagation()}>
            <h2 className="mono-text" style={{ fontSize: '40px', fontWeight: 900, marginBottom: '50px' }}>SYS_CONFIG</h2>
            <div style={{ marginBottom: '60px' }}>
              <label className="mono-text" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#8b5cf6', letterSpacing: '2px', marginBottom: '20px' }}>UPLINK_KEY</label>
              <input type="password" value={tempKey} onChange={e => setTempKey(e.target.value)} placeholder="AIzaSy..." className="mono-text" style={{ width: '100%', padding: '28px', borderRadius: '24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '24px', marginBottom: '40px', outline: 'none' }} />
              <label className="mono-text" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#ec4899', letterSpacing: '2px', marginBottom: '20px' }}>NODE_ID</label>
              <input type="text" value={tempCx} onChange={e => setTempCx(e.target.value)} placeholder="01234..." className="mono-text" style={{ width: '100%', padding: '28px', borderRadius: '24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '24px', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 30 }}>
              <button onClick={() => setShowSettings(false)} className="mono-text" style={{ flex: 1, height: '90px', borderRadius: '28px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '22px', fontWeight: 700, cursor: 'pointer' }}>CANCEL</button>
              <button onClick={() => {
                localStorage.setItem("kp_google_key", tempKey.trim());
                localStorage.setItem("kp_google_cx", tempCx.trim());
                setGoogleKey(tempKey.trim()); setGoogleCx(tempCx.trim());
                setShowSettings(false);
              }} className="mono-text" style={{ flex: 1, height: '90px', borderRadius: '28px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: 'none', color: '#fff', fontSize: '22px', fontWeight: 900, cursor: 'pointer' }}>SYNC_NODE</button>
            </div>
          </div>
        </div>
      )}

      {/* LINUX CLI TERMINAL OVERLAY (GEMINI-INSPIRED REDESIGN) */}
      {showTerminal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }} onClick={() => setShowTerminal(false)}>
          <div style={{
            width: '100%', maxWidth: '1000px', height: '85vh', background: '#000', border: '1px solid #333',
            borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
          }} onClick={e => e.stopPropagation()}>

            <div ref={termScrollRef} style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
              {/* STYLED ASCII LOGO HEADER */}
              <pre className="mono-text shimmer-text" style={{
                fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '40px',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.1, letterSpacing: '2px',
                textShadow: `
                  2px 2px 0px rgba(236, 72, 153, 0.4),
                  -2px -2px 0px rgba(6, 182, 212, 0.4),
                  0 0 20px rgba(79, 172, 254, 0.3)
                `,
                position: 'relative',
                whiteSpace: 'pre'
              }}>
                {`
 ██╗  ██╗██████╗
 ██║ ██╔╝██╔══██╗
 █████╔╝ ██████╔╝
 ██╔═██╗ ██╔═══╝
 ██║  ██╗██║
 ╚═╝  ╚═╝╚═╝
`}
              </pre>

              {/* STATUS BOX 1 */}
              <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.02)' }}>
                <p className="mono-text" style={{ fontSize: '12px', color: '#f87171', marginBottom: '8px' }}>KP Neural 2.1 and Pro are now available.</p>
                <p className="mono-text" style={{ fontSize: '12px', color: '#888' }}>Enable "Preview features" in /settings.</p>
                <p className="mono-text" style={{ fontSize: '12px', color: '#888' }}>Learn more at <span style={{ textDecoration: 'underline' }}>https://kp-search.io/neural</span></p>
              </div>

              {/* TIPS SECTION */}
              <div className="mono-text" style={{ fontSize: '12px', color: '#666', marginBottom: '32px' }}>
                <p style={{ marginBottom: '8px', color: '#999' }}>Tips for getting started:</p>
                <p>1. Ask questions, navigate neural paths, or run commands.</p>
                <p>2. Use 'search [q]' for rapid data extraction.</p>
                <p>3. /help for more information.</p>
              </div>

              {/* WARNING/ADVISORY BOX */}
              <div style={{ padding: '16px 20px', border: '1px solid #fbbf2440', borderRadius: '8px', marginBottom: '40px', background: 'rgba(251, 191, 36, 0.05)' }}>
                <p className="mono-text" style={{ fontSize: '12px', color: '#fbbf24', opacity: 0.9 }}>
                  You are running KP CLI in host directory. Neural connectivity is redirected to local nodes.
                </p>
              </div>

              {/* COMMAND HISTORY STREAM */}
              {terminalLines.length > 4 && (
                <div style={{ marginBottom: '40px', borderTop: '1px solid #111', paddingTop: '20px' }}>
                  {terminalLines.slice(4).map((line, i) => (
                    <div key={i} className="mono-text" style={{
                      color: line.startsWith('user@') ? '#34d399' : line.startsWith('ERROR') ? '#f87171' : '#fff',
                      fontSize: '12px', marginBottom: '8px', opacity: 0.8
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {/* FOCUSED PILL INPUT BOX */}
              <div style={{ width: '100%', padding: '16px 24px', border: '1px solid #3b82f6', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.05)', display: 'flex', alignItems: 'center', gap: 15, boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}>
                <span className="mono-text" style={{ color: '#fff', fontSize: '16px', opacity: 0.5 }}>{'>'}</span>
                <input
                  ref={termInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  placeholder="Type your message or /command"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', outline: 'none', caretColor: '#fff' }}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* SYSTEM FOOTER */}
            <div style={{ padding: '12px 40px', background: '#080808', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="mono-text" style={{ fontSize: '10px', color: '#333' }}>~</div>
              <div className="mono-text" style={{ fontSize: '11px', color: '#f87171' }}>no sandbox (see /docs)</div>
              <div className="mono-text" style={{ fontSize: '11px', color: '#888' }}>Auto (KP-OS 2.1) /model</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
