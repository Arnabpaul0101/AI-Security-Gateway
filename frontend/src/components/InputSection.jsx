import { motion as Motion } from "framer-motion";

const inputModes = [
  { id: "text", label: "Text", description: "Paste content" },
  { id: "file", label: "File", description: "Upload a document" },
];

export default function InputSection({
  mode,
  setMode,
  input,
  setInput,
  file,
  setFile,
  analyze,
  loading,
}) {
  const canAnalyze = mode === "text" ? input.trim().length > 0 : Boolean(file);

  return (
    <div className="rounded-lg border border-zinc-950/10 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase text-emerald-700">
          Analysis input
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950">
          Choose the source
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Submit plain text or a file to run the same detection workflow.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg border border-zinc-950/10 bg-zinc-50 p-1.5">
        {inputModes.map((item) => {
          const active = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`relative rounded-md px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {active && (
                <Motion.span
                  layoutId="active-input-mode"
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative block text-sm font-semibold">
                {item.label}
              </span>
              <span className="relative mt-1 block text-xs">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-72">
        {mode === "text" ? (
          <Motion.label
            key="text-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              Content to inspect
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste logs, prompts, documents, or customer messages here..."
              className="min-h-64 w-full resize-y rounded-lg border border-zinc-950/10 bg-[#fbfcf8] px-4 py-3 font-mono text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </Motion.label>
        ) : (
          <Motion.div
            key="file-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-64 flex-col justify-between rounded-lg border border-dashed border-zinc-950/20 bg-[#fbfcf8] p-5"
          >
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Upload a file for analysis
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                The selected file is sent through the existing backend endpoint.
              </p>
            </div>

            <label className="mt-6 block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full cursor-pointer rounded-lg border border-zinc-950/10 bg-white text-sm text-zinc-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-zinc-900 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-zinc-700"
              />
            </label>

            <p className="mt-4 rounded-lg bg-[#eef7f1] px-3 py-2 text-sm font-medium text-zinc-700">
              {file ? file.name : "No file selected yet"}
            </p>
          </Motion.div>
        )}
      </div>

      <Motion.button
        type="button"
        onClick={analyze}
        disabled={!canAnalyze || loading}
        whileHover={canAnalyze && !loading ? { y: -2 } : undefined}
        whileTap={canAnalyze && !loading ? { scale: 0.98 } : undefined}
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </Motion.button>
    </div>
  );
}
