import { motion as Motion } from "framer-motion";
import LogViewer from "./LogViewer";
import { getRiskCounts } from "../utils/riskUtils";

const riskStyles = {
  critical: "border-rose-200 bg-rose-50 text-rose-700",
  high: "border-red-200 bg-red-50 text-red-700",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function ResultsSection({ result }) {
  if (!result) {
    return (
      <div className="flex min-h-full items-center justify-center rounded-lg border border-zinc-950/10 bg-white p-6 text-center shadow-sm">
        <div className="max-w-sm">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Results
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950">
            Waiting for a scan
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Submit text or a file to see masked content, risk level, and
            security insights here.
          </p>
        </div>
      </div>
    );
  }

  const findings = result.findings || [];
  const insights = result.insights || [];
  const counts = getRiskCounts(findings);
  const riskLevel = result.risk_level || "unknown";

  return (
    <div className="rounded-lg border border-zinc-950/10 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-4 border-b border-zinc-950/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Scan results
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950">
            Risk Score: {result.risk_score ?? "N/A"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Review the masked content and the highest priority findings.
          </p>
        </div>

        <Motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="rounded-lg border border-zinc-950/10 bg-[#eef7f1] px-4 py-3 text-left md:text-right"
        >
          <p className="text-xs font-semibold uppercase text-zinc-500">
            Risk level
          </p>
          <p className="mt-1 text-xl font-semibold capitalize text-zinc-950">
            {riskLevel}
          </p>
        </Motion.div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(counts).map(([risk, count], index) => (
          <Motion.div
            key={risk}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className={`rounded-lg border px-3 py-3 ${riskStyles[risk]}`}
          >
            <p className="text-xs font-semibold uppercase">{risk}</p>
            <p className="mt-1 text-2xl font-semibold">{count}</p>
          </Motion.div>
        ))}
      </div>

      <LogViewer
        content={result.masked_content || ""}
        findings={findings}
      />

      <div className="mt-5">
        <h3 className="text-base font-semibold text-zinc-950">Insights</h3>
        {insights.length > 0 ? (
          <div className="mt-3 space-y-2">
            {insights.map((insight, idx) => (
              <Motion.p
                key={`${idx}-${insight}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="rounded-lg border border-zinc-950/10 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700"
              >
                {insight}
              </Motion.p>
            ))}
          </div>
        ) : (
          <p className="mt-3 rounded-lg border border-zinc-950/10 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            No insights returned for this scan.
          </p>
        )}
      </div>
    </div>
  );
}
