import { useState } from "react";
import axios from "axios";

export default function useAnalysis() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("text");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (loading) return;

    if (mode === "text" && !input.trim()) return;
    if (mode === "file" && !file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("input_type", mode);

    if (mode === "text") formData.append("content", input);
    if (mode === "file") formData.append("file", file);

    try {
      const res = await axios.post("https://ai-security-gateway.onrender.com/analyze", formData);
      setResult(res.data);
      console.log(res.data);
    } catch {
      setError("Backend error. Ensure server is running.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
