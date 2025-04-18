"use client";

import { Stack } from "@/components/common/flex/Stack";
import { Form } from "@/components/ui/style/Form";
import Modal from "@/components/ui/style/Modal";
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
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromPx = breakpoints[from];
    const toPx = breakpoints[to];
    const min = parseFloat(fromRem);
    const max = parseFloat(toRem);

    if (!fromPx || !toPx || isNaN(min) || isNaN(max)) {
      setError("입력이 올바르지 않습니다.");
      setResult(null);
      setShowModal(true);
      return;
    }

    setError(null);

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
    setShowModal(true);
    navigator.clipboard.writeText(clamp);
  };

  return (
    <>
      {/* 입력 필드 */}
      <Form.Container onSubmit={calculate}>
        <Stack.H>
          <Form.Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(breakpoints).map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </Form.Select>
          <Form.Input value={fromRem} onChange={(e) => setFromRem(e.target.value)} placeholder="from rem" />
        </Stack.H>
        <Stack.H>
          <Form.Select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(breakpoints).map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </Form.Select>
          <Form.Input value={toRem} onChange={(e) => setToRem(e.target.value)} placeholder="to rem" />
        </Stack.H>
        {/* 계산 버튼 */}
        <Form.Button onSubmit={calculate}>계산하기 & 복사</Form.Button>
      </Form.Container>

      {/* 결과 */}
      <div className="h-8">
        <code className={"p-2 bg-gray-100 rounded break-all block text-black text-xs"}>{result || "result here"}</code>
      </div>

      {/* 모달 알림 */}
      {showModal ? (
        <>
          {error ? (
            <Modal.Error message={error} onClose={() => setShowModal(false)} />
          ) : (
            <Modal.Info message="복사 완료!" onClose={() => setShowModal(false)} />
          )}
        </>
      ) : null}
    </>
  );
}
