import React, { useState, useEffect } from 'react';
import {
  Play, Pause, RotateCcw, CheckCircle2, ChevronRight,
  Shield, Network, Cpu, FileText, Download, Sparkles
} from 'lucide-react';
import { useDemo, DEMO_STEPS } from '../context/DemoContext';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface DemoWalkthroughPageProps {
  onNavigate: (route: string) => void;
}

export const DemoWalkthroughPage: React.FC<DemoWalkthroughPageProps> = ({ onNavigate }) => {
  const { startDemo } = useDemo();

  // Simulated video walkthrough player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);

  const chapters = [
    { time: 0, title: '1. Opening Intelligence Dashboard', desc: 'Analyst monitors 24 synthetic actors, 68 handles, and 180+ relationships.' },
    { time: 6, title: '2. Searching for ShadowX', desc: 'Filtering catalog for high-risk cybercrime persona ACTOR-DEMO-001.' },
    { time: 12, title: '3. Opening Actor Profile Dossier', desc: 'Reviewing category, first/last seen active eras, and academic synthetic notice.' },
    { time: 18, title: '4. Examining Digital Identifiers', desc: 'Correlating handles (Shadow_X01, XShadow), PGP-DEMO-001, and wallet clusters.' },
    { time: 24, title: '5. Launching Relationship Graph', desc: 'Interactive Neo4j graph reveals multi-hop connections to NightCipher and GhostByte.' },
    { time: 30, title: '6. Selecting Related Entity Node', desc: 'Side inspector highlights PGP key binding between multiple forum storefronts.' },
    { time: 36, title: '7. Auditing Longitudinal Timeline', desc: 'Filtering Jan 2025 to Sep 2026 events and inspecting raw snippet evidence.' },
    { time: 42, title: '8. Running AI Stylometric Engine', desc: 'Comparing vocabulary, sentence length, and trigrams yielding 78% similarity.' },
    { time: 48, title: '9. Inspecting Multi-Factor Radar', desc: 'Validating transparent 84% Analytical Association Confidence breakdown.' },
    { time: 54, title: '10. Compiling Investigation Report', desc: 'Generating forensic dossier with citations and timeline audit.' },
    { time: 60, title: '11. Exporting JSON / CSV Dossier', desc: 'Downloading evidence files for peer review and academic demonstration.' }
  ];

  const totalDuration = 66;

  // Auto-progress simulated player when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime(t => {
          const next = t + 1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          // Update chapter
          const ch = chapters.slice().reverse().find(c => next >= c.time);
          if (ch) {
            const idx = chapters.findIndex(c => c.time === ch.time);
            setCurrentChapter(idx);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Play className="w-6 h-6 text-blue-600 fill-current" />
            <span>Interactive Demo Walkthrough</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulated video walkthrough showcasing full persona attribution and forensic export.
          </p>
        </div>

        <button
          onClick={() => {
            startDemo();
            onNavigate('/actors');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Hands-On Guided Tour</span>
        </button>
      </div>

      <ExplanationBox
        title="Walkthrough Video Player"
        shortSummary="Watch the automated sequence or scrub between chapters below to understand the 11 key milestones."
        details="This interactive demo walkthrough replicates the real investigator workflow: identifying ShadowX, inspecting cryptographic PGP signatures, traversing the graph network, and producing defensible attribution evidence."
      />

      {/* Video Simulation Player Component */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 text-white">
        {/* Visual Stage */}
        <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-8 select-none">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-slate-300">DEMO RECORDING // PersonaTrace Sandbox</span>
          </div>

          <div className="text-center max-w-lg space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full">
              Chapter {currentChapter + 1} of {chapters.length}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {chapters[currentChapter].title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {chapters[currentChapter].desc}
            </p>
          </div>

          {/* Centered Play / Pause Trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 mt-6 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </button>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-400 w-10 text-right">
              {String(Math.floor(playbackTime / 60)).padStart(2, '0')}:{String(playbackTime % 60).padStart(2, '0')}
            </span>

            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = clickX / rect.width;
                const newTime = Math.round(pct * totalDuration);
                setPlaybackTime(newTime);
                const ch = chapters.slice().reverse().find(c => newTime >= c.time);
                if (ch) setCurrentChapter(chapters.findIndex(c => c.time === ch.time));
              }}
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(playbackTime / totalDuration) * 100}%` }}
              />
            </div>

            <span className="font-mono text-[11px] text-slate-400 w-10">
              01:06
            </span>
          </div>

          {/* Chapter Quick Jump Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {isPlaying ? 'Pause' : 'Play Simulation'}
              </button>
              <button
                onClick={() => { setPlaybackTime(0); setCurrentChapter(0); }}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] text-slate-400">
              Audio muted · Local demonstration player
            </span>
          </div>
        </div>
      </div>

      {/* Demo Workflow Section Below */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Demo Workflow & Key Scenario Milestones
        </h2>
        <p className="text-xs text-slate-500">
          The step-by-step investigation story encoded into our synthetic dataset:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((ch, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPlaybackTime(ch.time);
                setCurrentChapter(idx);
              }}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                currentChapter === idx
                  ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900">{ch.title}</span>
                <span className="font-mono text-[11px] text-slate-400">{ch.time}s</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {ch.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
