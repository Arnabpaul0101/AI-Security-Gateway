function getLineRisk(lineNumber, findings) {
  const found = findings.find((finding) => finding.line === lineNumber);
  return found ? found.risk : null;
}

function getTone(risk) {
  if (risk === "critical") {
    return "border-l-rose-400/80 bg-rose-400/12";
  }

  if (risk === "high") {
    return "border-l-orange-300/80 bg-orange-300/10";
  }

  if (risk === "medium") {
    return "border-l-amber-300/80 bg-amber-300/10";
  }

  if (risk === "low") {
    return "border-l-emerald-300/80 bg-emerald-300/10";
  }

  return "border-l-transparent bg-transparent";
}

function LogViewer({ content, findings }) {
  const lines = content.split("\n");

  return (
    <div className="max-h-[36rem] overflow-auto rounded-[1.5rem] border border-white/10 bg-slate-950/80">
      <div className="min-w-full divide-y divide-white/6 font-mono text-sm">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const risk = getLineRisk(lineNumber, findings);

          return (
            <div
              key={`${lineNumber}-${line}`}
              className={`flex gap-4 border-l-2 px-4 py-2.5 transition hover:bg-white/5 ${getTone(risk)}`}
            >
              <span className="w-10 shrink-0 text-right text-xs text-slate-500">
                {lineNumber}
              </span>
              <span className="whitespace-pre-wrap break-all leading-6 text-slate-200">
                {line || " "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LogViewer;
