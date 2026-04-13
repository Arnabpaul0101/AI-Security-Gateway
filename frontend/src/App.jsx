import { motion as Motion } from "framer-motion";
import useAnalysis from "./hooks/useAnalysis";
import InputSection from "./components/InputSection";
import ResultsSection from "./components/ResultsSection";

function App() {
  const {
    input,
    setInput,
    file,
    setFile,
    mode,
    setMode,
    result,
    loading,
    error,
    analyze,
  } = useAnalysis();

  return (
    <main className="min-h-screen bg-[#f5f7f2] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-6 border-b border-zinc-950/10 pb-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Security analysis
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-5xl">
              AI Secure Data Intelligence Platform
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Scan text or uploaded files for sensitive data, review masked
              output, and prioritize findings by risk.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg border border-zinc-950/10 bg-white p-2 shadow-sm">
            {["Text", "File", "Risk"].map((item) => (
              <div key={item} className="rounded-md bg-[#eef7f1] px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase text-zinc-500">
                  {item}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  Ready
                </p>
              </div>
            ))}
          </div>
        </Motion.header>

        <div className="grid flex-1 gap-5 py-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="min-w-0"
          >
            <InputSection
              mode={mode}
              setMode={setMode}
              input={input}
              setInput={setInput}
              file={file}
              setFile={setFile}
              analyze={analyze}
              loading={loading}
            />
          </Motion.section>

          <Motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="min-w-0"
          >
            {error && (
              <Motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              >
                {error}
              </Motion.p>
            )}

            <ResultsSection result={result} />
          </Motion.section>
        </div>
      </div>
    </main>
  );
}

export default App;
