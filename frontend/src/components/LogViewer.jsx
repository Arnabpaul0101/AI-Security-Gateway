import { motion as Motion } from "framer-motion";

function getLineRisk(lineNumber, findings) {
  const found = findings.find((finding) => finding.line === lineNumber);
  return found ? found.risk : null;
}

function getTone(risk) {
  if (risk === "critical") {
    return "border-l-rose-400 bg-rose-500/15";
  }

  if (risk === "high") {
    return "border-l-red-400 bg-red-500/15";
  }

  if (risk === "medium") {
    return "border-l-amber-300 bg-amber-400/15";
  }

  if (risk === "low") {
    return "border-l-emerald-300 bg-emerald-400/15";
  }

  return "border-l-transparent bg-transparent";
}

function LogViewer({ content, findings }) {
  const lines = content.split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-950/10 bg-[#151713]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">Masked content</p>
          <p className="mt-1 text-xs text-zinc-400">
            Lines are highlighted when findings include a risk marker.
          </p>
        </div>
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-200">
          {lines.length} lines
        </span>
      </div>

      <div className="max-h-[32rem] min-w-full overflow-auto font-mono text-sm">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const risk = getLineRisk(lineNumber, findings);

          return (
            <Motion.div
              key={`${lineNumber}-${line}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: Math.min(index * 0.015, 0.25) }}
              className={`flex gap-4 border-l-2 px-4 py-2.5 transition hover:bg-white/5 ${getTone(risk)}`}
            >
              <span className="w-10 shrink-0 text-right text-xs text-zinc-500">
                {lineNumber}
              </span>
              <span className="whitespace-pre-wrap break-all leading-6 text-zinc-100">
                {line || " "}
              </span>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default LogViewer;
