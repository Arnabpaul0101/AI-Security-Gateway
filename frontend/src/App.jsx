import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import LogViewer from "./components/LogViewer";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const riskTone = {
  critical: {
    badge: "bg-rose-500/20 text-rose-100 ring-1 ring-inset ring-rose-300/25",
    surface: "from-rose-500/20 to-rose-500/5",
    glow: "shadow-[0_0_40px_rgba(244,63,94,0.18)]",
  },
  high: {
    badge: "bg-orange-400/20 text-orange-50 ring-1 ring-inset ring-orange-200/20",
    surface: "from-orange-400/20 to-orange-400/5",
    glow: "shadow-[0_0_40px_rgba(251,146,60,0.16)]",
  },
  medium: {
    badge: "bg-amber-300/20 text-amber-50 ring-1 ring-inset ring-amber-100/20",
    surface: "from-amber-300/20 to-amber-300/5",
    glow: "shadow-[0_0_40px_rgba(252,211,77,0.12)]",
  },
  low: {
    badge: "bg-emerald-400/20 text-emerald-50 ring-1 ring-inset ring-emerald-100/20",
    surface: "from-emerald-400/20 to-emerald-400/5",
    glow: "shadow-[0_0_40px_rgba(74,222,128,0.12)]",
  },
};

const modeOptions = [
  {
    id: "text",
    label: "Text Input",
    description: "Paste alerts, application logs, or audit trails for instant analysis.",
  },
  {
    id: "file",
    label: "Upload File",
    description: "Drop `.log` or `.txt` files to scan larger incident datasets.",
  },
];

const MotionMain = motion.main;
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionButton = motion.button;

function App() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("text");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findings = result?.findings ?? [];
  const insights = result?.insights ?? [];
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };

  findings.forEach((finding) => {
    if (counts[finding.risk] !== undefined) {
      counts[finding.risk] += 1;
    }
  });

  const totalFindings = findings.length;
  const isAnalyzeDisabled =
    loading || (mode === "text" ? !input.trim() : !file);

  const analyze = async () => {
    if (isAnalyzeDisabled) {
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("input_type", mode);

    if (mode === "text") {
      formData.append("content", input);
    } else if (file) {
      formData.append("file", file);
    }

    try {
      const res = await axios.post("http://localhost:8000/analyze", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        "Analysis could not be completed. Confirm the backend is running on port 8000 and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.14),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.14),_transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

      <MotionMain
        className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionSection
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),transparent_30%,rgba(16,185,129,0.12)_65%,transparent)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
                Security Intelligence Console
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl [font-family:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
                  Detect exposed secrets and risky signals in a dashboard that feels mission-ready.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Analyze logs or raw text, surface severity in seconds, and review masked output in a high-clarity workspace built for fast incident triage.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Response Model" value="Live Risk Scan" tone="cyan" />
                <MetricCard label="Coverage" value="Text + Files" tone="emerald" />
                <MetricCard label="Review Style" value="Masked Output" tone="amber" />
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Workflow
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Secure Analysis
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  Ready
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-300">
                <WorkflowRow number="01" text="Select input mode and attach your incident data." />
                <WorkflowRow number="02" text="Run the analyzer to score severity and findings." />
                <WorkflowRow number="03" text="Inspect masked logs and AI-generated guidance." />
              </div>
            </div>
          </div>
        </MotionSection>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionSection
            variants={itemVariants}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-6"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Input Control
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Submit data for analysis
                  </h2>
                </div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                  {modeOptions.map((option) => {
                    const active = mode === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setMode(option.id)}
                        className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                          active ? "text-white" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mode-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <MotionDiv
                  key={mode}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <p className="text-sm leading-7 text-slate-300">
                    {modeOptions.find((option) => option.id === mode)?.description}
                  </p>

                  {mode === "text" ? (
                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-slate-200">
                        Log payload
                      </span>
                      <textarea
                        rows="12"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Paste raw logs, access records, or suspicious text blocks here..."
                        className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-5 py-4 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/10"
                      />
                    </label>
                  ) : (
                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-slate-200">
                        Incident file
                      </span>
                      <div className="rounded-[1.5rem] border border-dashed border-cyan-300/25 bg-cyan-300/6 p-6 text-center">
                        <input
                          type="file"
                          accept=".log,.txt"
                          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                          className="mx-auto block w-full max-w-sm cursor-pointer text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/15"
                        />
                        <p className="mt-4 text-sm text-slate-400">
                          {file
                            ? `Selected file: ${file.name}`
                            : "Choose a `.log` or `.txt` file to scan."}
                        </p>
                      </div>
                    </label>
                  )}
                </MotionDiv>
              </AnimatePresence>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <MotionButton
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={analyze}
                  disabled={isAnalyzeDisabled}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(45,212,191,0.35)] transition disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {loading ? "Analyzing..." : "Launch Analysis"}
                </MotionButton>
                <p className="text-sm text-slate-400">
                  Results will appear with severity, findings, masked logs, and insights.
                </p>
              </div>

              <AnimatePresence>
                {error && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
                  >
                    {error}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </MotionSection>

          <MotionSection
            variants={itemVariants}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-6"
          >
            <div className="flex h-full flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Risk posture at a glance
                </h2>
              </div>

              <div
                className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br p-6 ${
                  riskTone[result?.risk_level?.toLowerCase()]?.surface ?? "from-cyan-400/20 to-slate-900"
                } ${riskTone[result?.risk_level?.toLowerCase()]?.glow ?? "shadow-[0_0_40px_rgba(34,211,238,0.12)]"}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_45%)]" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
                        Current Status
                      </p>
                      <p className="mt-3 text-5xl font-semibold text-white">
                        {result ? result.risk_score : "--"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                        riskTone[result?.risk_level?.toLowerCase()]?.badge ??
                        "bg-white/10 text-white ring-1 ring-inset ring-white/10"
                      }`}
                    >
                      {result?.risk_level ?? "Awaiting Scan"}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <StatTile label="Findings" value={totalFindings} />
                    <StatTile label="Critical" value={counts.critical} />
                    <StatTile label="Action" value={result?.action ?? "Pending"} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryCard title="Critical" value={counts.critical} tone="critical" />
                <SummaryCard title="High" value={counts.high} tone="high" />
                <SummaryCard title="Medium" value={counts.medium} tone="medium" />
                <SummaryCard title="Low" value={counts.low} tone="low" />
              </div>
            </div>
          </MotionSection>
        </div>

        <AnimatePresence>
          {result && (
            <MotionSection
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-8"
            >
              <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
                <Panel title="Findings Feed" subtitle="Severity-tagged detections across the submitted data.">
                  <div className="space-y-3">
                    {findings.length > 0 ? (
                      findings.map((finding, index) => (
                        <MotionDiv
                          key={`${finding.type}-${finding.line}-${index}`}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                          className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-white">
                                  {finding.type}
                                </span>
                                <RiskPill risk={finding.risk} />
                              </div>
                              <p className="text-sm text-slate-400">
                                Line {finding.line}
                              </p>
                              <p className="break-all text-sm leading-7 text-slate-200">
                                {finding.value}
                              </p>
                            </div>
                          </div>
                        </MotionDiv>
                      ))
                    ) : (
                      <EmptyState message="No findings were returned for this analysis." />
                    )}
                  </div>
                </Panel>

                <Panel title="Masked Logs" subtitle="Line-by-line masked output with highlighted risk anchors.">
                  <LogViewer content={result.masked_content} findings={findings} />
                </Panel>
              </div>

              <Panel title="AI Insights" subtitle="Recommended interpretation and follow-up actions generated from the scan.">
                <div className="grid gap-3 md:grid-cols-2">
                  {insights.length > 0 ? (
                    insights.map((insight, index) => (
                      <MotionDiv
                        key={`${insight}-${index}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4 text-sm leading-7 text-slate-200"
                      >
                        {insight}
                      </MotionDiv>
                    ))
                  ) : (
                    <EmptyState message="Insights will appear here once the analyzer returns a response." />
                  )}
                </div>
              </Panel>
            </MotionSection>
          )}
        </AnimatePresence>
      </MotionMain>
    </div>
  );
}

function MetricCard({ label, value, tone }) {
  const toneClass = {
    cyan: "from-cyan-300/18 to-cyan-300/5 text-cyan-50",
    emerald: "from-emerald-300/18 to-emerald-300/5 text-emerald-50",
    amber: "from-amber-300/18 to-amber-300/5 text-amber-50",
  };

  return (
    <div
      className={`rounded-[1.4rem] border border-white/10 bg-gradient-to-br p-4 ${toneClass[tone]}`}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function WorkflowRow({ number, text }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/12 text-xs font-semibold tracking-[0.24em] text-cyan-100">
        {number}
      </div>
      <p className="leading-6 text-slate-200">{text}</p>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/45 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function SummaryCard({ title, value, tone }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-300">{title}</span>
        <RiskPill risk={tone} />
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Panel({ title, subtitle, children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{title}</p>
        <p className="mt-2 text-sm leading-7 text-slate-300">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function RiskPill({ risk }) {
  const key = risk?.toLowerCase() ?? "low";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
        riskTone[key]?.badge ?? riskTone.low.badge
      }`}
    >
      {risk}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-[1.35rem] border border-dashed border-white/10 bg-white/4 px-4 py-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

export default App;
