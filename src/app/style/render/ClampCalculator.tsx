"use client";

import Button from "@/components/ui/common/Button";
import Stack from "@/components/ui/common/Stack";
import { Form } from "@/components/ui/common/Form";
import Modal from "@/components/ui/common/Modal";
import { Switch } from "@/components/util/Switch";
import { Match } from "@/components/util/Switch";
import { Copy } from "lucide-react";
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

const bpKeys = Object.keys(breakpoints);

export default function ClampCalculator() {
  const [range, setRange] = useState<[string, string] | null>(null);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [unit, setUnit] = useState<"rem" | "px">("rem");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toPx = (val: number) => (unit === "rem" ? val * 16 : val);
  const formatUnit = (px: number) => (unit === "rem" ? `${(px / 16).toFixed(2)}rem` : `${px.toFixed(2)}px`);

  const handleBreakpointClick = (bp: string) => {
    const selectedBreakpointIndex = bpKeys.indexOf(bp);

    // 첫 클릭, 초기화
    if (!range) {
      setRange([bp, bp]);
      return;
    }

    const [start, _end] = range;
    const rangeStartIndex = bpKeys.indexOf(start);

    // 두 개 선택된 상태에서 작은 값 클릭, 초기화
    if (selectedBreakpointIndex === rangeStartIndex) {
      setRange(null);
      return;
    }

    // 새로 선택된 값이 현재 범위의 시작 값보다 작은 경우, 초기화
    if (selectedBreakpointIndex <= rangeStartIndex) {
      setRange([bp, bp]);
      return;
    }

    // 새로 선택된 값이 현재 범위의 시작 값보다 큰 경우, 확장
    if (selectedBreakpointIndex >= rangeStartIndex) {
      setRange([start, bp]);
      return;
    }
  };

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!range) {
      setError("브레이크포인트를 선택해주세요.");
      setResult(null);
      setShowModal(true);
      return;
    }

    const fromPx = breakpoints[range[0]];
    const toPxVal = breakpoints[range[1]];
    const min = parseFloat(fromValue);
    const max = parseFloat(toValue);

    if (!fromPx || !toPxVal || isNaN(min) || isNaN(max)) {
      setError("입력이 올바르지 않습니다.");
      setResult(null);
      setShowModal(true);
      return;
    }

    setError(null);

    const x1 = fromPx;
    const x2 = toPxVal;
    const y1 = toPx(min);
    const y2 = toPx(max);

    const slope = ((y2 - y1) / (x2 - x1)) * 100;
    const intercept = y1 - (slope / 100) * x1;

    const clamp = `clamp(${formatUnit(y1)},calc(${slope.toFixed(5)}vw${intercept >= 0 ? "+" : ""}${intercept.toFixed(
      2
    )}px),${formatUnit(y2)})`;

    setResult(clamp);
    setShowModal(true);
    navigator.clipboard.writeText(clamp);
  };

  return (
    <>
      {/* 단위 선택 버튼 (우측 정렬) */}
      <Stack.H justify="end">
        <Button.Select onClick={() => setUnit("rem")} className={"text-sm"} selected={unit === "rem"}>
          rem
        </Button.Select>
        <Button.Select onClick={() => setUnit("px")} className={"text-sm"} selected={unit === "px"}>
          px
        </Button.Select>
      </Stack.H>

      <Form.Container onSubmit={calculate}>
        <Stack.V className="gap-4">
          {/* from 브레이크포인트 선택 */}
          <Stack.V>
            <label className="text-sm font-medium text-gray-700">Breakpoint</label>
            <Stack.H>
              {bpKeys.map((bp) => {
                const active =
                  range &&
                  bpKeys.indexOf(bp) >= bpKeys.indexOf(range[0]) &&
                  bpKeys.indexOf(bp) <= bpKeys.indexOf(range[1]);
                return (
                  <button
                    key={bp}
                    type="button"
                    onClick={() => handleBreakpointClick(bp)}
                    className={`px-2 py-1 rounded text-xs border ${
                      active ? "bg-black text-white" : "bg-white text-gray-800"
                    }`}
                  >
                    {bp}
                  </button>
                );
              })}
            </Stack.H>
          </Stack.V>

          {/* 수치 입력(From, To) */}
          <Stack.V className="gap-2">
            <label className="text-sm font-medium text-gray-700">Size</label>
            <Stack.H>
              <Form.Input
                className="w-1/2"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="min"
              />
              <Form.Input
                className="w-1/2"
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
                placeholder="max"
              />
            </Stack.H>
          </Stack.V>

          {/* 확인 버튼 */}
          <Button.Primary className="w-full">계산하기 & 복사</Button.Primary>
        </Stack.V>
      </Form.Container>

      {/* 결과창 */}
      <Stack.H justify="between" className="h-8 p-2 rounded bg-gray-100">
        <code className="w-full text-black text-xs truncate">{result || "result here"}</code>
        <button
          type="button"
          onClick={() => {
            if (result) {
              navigator.clipboard.writeText(result);
              setShowModal(true);
            }
          }}
          className={`p-1 rounded hover:bg-gray-200 ${!result && "opcaity-40 pointer-events-none"}`}
        >
          <Copy className="w-4 h-4 text-gray-600" />
        </button>
      </Stack.H>

      <Switch when={showModal}>
        <Match when={!!error}>
          <Modal.Error message={error!} onClose={() => setShowModal(false)} />
        </Match>
        <Match when={!error}>
          <Modal.Info message="복사 완료! 원하시는 곳에 붙여넣기 해주세요." onClose={() => setShowModal(false)} />
        </Match>
      </Switch>
    </>
  );
}
