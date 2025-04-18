"use client";

import { useState } from "react";

const breakpoints: Record<string, number> = {
  tiny: 320,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export default function ClampCalculator() {
  const [from, setFrom] = useState("md");
  const [to, setTo] = useState("xl");
  const [fromRem, setFromRem] = useState("");
  const [toRem, setToRem] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromPx = breakpoints[from];
    const toPx = breakpoints[to];
    const min = parseFloat(fromRem);
    const max = parseFloat(toRem);

    if (!fromPx || !toPx || isNaN(min) || isNaN(max)) {
      setError("입력이 올바르지 않습니다.");
      setResult("");
      return;
    }

    setError("");

    const x1 = fromPx;
    const x2 = toPx;
    const y1 = min * 16;
    const y2 = max * 16;

    const slope = ((y2 - y1) / (x2 - x1)) * 100;
    const intercept = y1 - (slope / 100) * x1;

    const clamp = `clamp(${min}rem,calc(${slope.toFixed(5)}vw${intercept > 0 ? "+" : ""}${intercept.toFixed(
      2
    )}px),${max}rem)`;
    setResult(clamp);
    navigator.clipboard.writeText(clamp);
    console.log("복사 완료!");
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-6 space-y-4">
      {/* 제목 */}
      <h1 className="text-lg font-semibold text-gray-800">🔢 CSS Clamp Calculator</h1>

      {/* 설명 */}
      <p className="bg-gray-100 p-2 rounded text-sm text-gray-500">
        - 브레이크포인트에 따라 반응형 너비 계산 & 복사
        <br />
        (예: md:768px → xl:1280px 끊기지 않도록 하는 계산식 생성)
      </p>

      {/* 입력 필드 */}
      <form className="flex flex-col gap-3" onSubmit={calculate}>
        <div className="flex gap-2">
          <select className="border p-2 rounded w-full text-sm" value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(breakpoints).map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </select>
          <input
            className="border p-2 rounded w-full text-sm"
            value={fromRem}
            onChange={(e) => setFromRem(e.target.value)}
            placeholder="from rem"
          />
        </div>
        <div className="flex gap-2">
          <select className="border p-2 rounded w-full text-sm" value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(breakpoints).map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </select>
          <input
            className="border p-2 rounded w-full text-sm"
            value={toRem}
            onChange={(e) => setToRem(e.target.value)}
            placeholder="to rem"
          />
        </div>
        {/* 계산 버튼 */}
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm">
          계산하기 & 복사
        </button>
      </form>

      {/* 결과 */}
      <div className="h-8">
        <code
          className={`p-2 bg-gray-100 rounded break-all block ${error ? "text-red-500 text-xs" : "text-black text-xs"}`}
        >
          {error || result || "result here"}
        </code>
      </div>
    </div>
  );
}
