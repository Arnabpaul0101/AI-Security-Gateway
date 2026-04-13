export function getRiskCounts(findings = []) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };

  findings.forEach((f) => {
    if (counts[f.risk] !== undefined) counts[f.risk]++;
  });

  return counts;
}