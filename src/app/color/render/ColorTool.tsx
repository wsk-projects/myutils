"use client";

import Modal from "@/components/ui/common/Modal";
import { Match, Switch } from "@/components/util/Switch";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/ui/common/Button";

extend([namesPlugin]);

type ColorFormat = "hex" | "rgb" | "hsl";
type RgbKey = "r" | "g" | "b";
type HslKey = "h" | "s" | "l";

export default function ColorTool() {
  const [hex, setHex] = useState("#808080");
  const [rgb, setRgb] = useState({ r: 128, g: 128, b: 128 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 50 });
  const [showModal, setShowModal] = useState(false);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");

  // 업데이트 소스를 추적하기 위한 ref
  const updateSource = useRef<"hex" | "rgb" | "hsl" | null>(null);
  // 업데이트 중인지 추적하기 위한 ref
  const isUpdating = useRef(false);

  // HEX 값이 변경될 때 RGB와 HSL 업데이트
  const updateFromHex = (newHex: string) => {
    if (isUpdating.current) return;

    isUpdating.current = true;
    updateSource.current = "hex";

    const color = colord(newHex);
    if (color.isValid()) {
      setRgb(color.toRgb());
      setHsl(color.toHsl());
    }

    setTimeout(() => {
      isUpdating.current = false;
      updateSource.current = null;
    }, 0);
  };

  // RGB 값이 변경될 때 HEX와 HSL 업데이트
  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    if (isUpdating.current) return;

    isUpdating.current = true;
    updateSource.current = "rgb";

    // RGB 값을 먼저 업데이트
    setRgb(newRgb);

    const color = colord(newRgb);
    if (color.isValid()) {
      setHex(color.toHex());
      setHsl(color.toHsl());
    }

    setTimeout(() => {
      isUpdating.current = false;
      updateSource.current = null;
    }, 0);
  };

  // HSL 값이 변경될 때 HEX와 RGB 업데이트
  const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
    if (isUpdating.current) return;

    isUpdating.current = true;
    updateSource.current = "hsl";

    // HSL 값을 먼저 업데이트
    setHsl(newHsl);

    const color = colord(newHsl);
    if (color.isValid()) {
      setHex(color.toHex());
      setRgb(color.toRgb());
    }

    setTimeout(() => {
      isUpdating.current = false;
      updateSource.current = null;
    }, 0);
  };

  // 복사 버튼 클릭 시 클립보드에 복사
  const handleCopy = () => {
    let textToCopy = "";

    switch (colorFormat) {
      case "hex":
        textToCopy = hex;
        break;
      case "rgb":
        textToCopy = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        break;
      case "hsl":
        textToCopy = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
        break;
    }

    navigator.clipboard.writeText(textToCopy);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  // 색상 형식 버튼 클릭 핸들러
  const handleFormatClick = (format: ColorFormat) => {
    setColorFormat(format);
  };

  // 현재 선택된 형식에 따른 색상 코드 표시
  const getFormattedColorCode = () => {
    switch (colorFormat) {
      case "hex":
        return hex;
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "hsl":
        return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
      default:
        return hex;
    }
  };

  // RGB 값 변경 핸들러
  const handleRgbChange = (key: RgbKey, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
      const newRgb = { ...rgb, [key]: numValue };
      updateFromRgb(newRgb);
    }
  };

  // HSL 값 변경 핸들러
  const handleHslChange = (key: HslKey, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const max = key === "h" ? 360 : 100;
      if (numValue >= 0 && numValue <= max) {
        const newHsl = { ...hsl, [key]: numValue };
        updateFromHsl(newHsl);
      }
    }
  };

  // RGB 슬라이더 스타일 생성
  const getRgbSliderStyle = (key: RgbKey) => {
    const colors = {
      r: [`rgb(0, ${rgb.g}, ${rgb.b})`, `rgb(255, ${rgb.g}, ${rgb.b})`],
      g: [`rgb(${rgb.r}, 0, ${rgb.b})`, `rgb(${rgb.r}, 255, ${rgb.b})`],
      b: [`rgb(${rgb.r}, ${rgb.g}, 0)`, `rgb(${rgb.r}, ${rgb.g}, 255)`],
    };

    return {
      background: `linear-gradient(to right, ${colors[key][0]}, ${colors[key][1]})`,
    };
  };

  // HSL 슬라이더 스타일 생성
  const getHslSliderStyle = (key: HslKey) => {
    if (key === "h") {
      // 색상 슬라이더 - 현재 채도와 명도를 유지하면서 색상만 변경
      const steps = 12; // 색상 단계 수
      const gradientStops = [];

      for (let i = 0; i <= steps; i++) {
        const hue = (i * 360) / steps;
        gradientStops.push(`hsl(${hue}, ${hsl.s}%, ${hsl.l}%)`);
      }

      return {
        background: `linear-gradient(to right, ${gradientStops.join(", ")})`,
      };
    } else if (key === "s") {
      // 채도 슬라이더 - 현재 색상과 명도를 유지하면서 채도만 변경
      return {
        background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
      };
    } else {
      // 명도 슬라이더 - 현재 색상과 채도를 유지하면서 명도만 변경
      return {
        background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
      };
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      {/* 현재 색상 및 HEX 입력 */}
      <div className="w-full h-1/2 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          {/* 색상 디스플레이 */}
          <label className="font-medium">미리보기</label>
          <div
            className="w-full h-48 rounded-lg border cursor-pointer"
            style={{ backgroundColor: hex }}
            onClick={handleCopy}
          />
          {/* 색상 형식 선택 버튼 */}
          <div className="flex flex-wrap gap-1">
            {(["hex", "rgb", "hsl"] as ColorFormat[]).map((format) => (
              <Button.Select
                key={format}
                onClick={() => handleFormatClick(format)}
                className={"px-2 py-1 rounded text-xs border"}
                selected={colorFormat === format}
              >
                {format.toUpperCase()}
              </Button.Select>
            ))}
          </div>
          <div className="relative">
            <div>
              <label className="hidden text-sm font-medium">색상 코드</label>
              <div className="flex flex-row justify-between items-center p-2 rounded bg-gray-100">
                <input
                  type="text"
                  value={getFormattedColorCode()}
                  onChange={(e) => {
                    if (colorFormat === "hex") {
                      const newHex = e.target.value;
                      setHex(newHex);
                      if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
                        updateFromHex(newHex);
                      }
                    }
                  }}
                  className="w-full text-black text-xs bg-transparent border-none focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  tabIndex={-1}
                  className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                  title="복사하기"
                >
                  <Copy size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RGB 조절 */}
      <div className="w-full h-1/4 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <label className="font-medium">RGB</label>
        {(["r", "g", "b"] as RgbKey[]).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-6 text-sm uppercase">{key}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={rgb[key]}
              onChange={(e) => {
                const newRgb = { ...rgb, [key]: parseInt(e.target.value) };
                // RGB 값을 먼저 업데이트
                setRgb(newRgb);

                // 그 다음 HEX와 HSL 업데이트
                const color = colord(newRgb);
                if (color.isValid()) {
                  setHex(color.toHex());
                  setHsl(color.toHsl());
                }
              }}
              className="flex-1 h-2 rounded appearance-none cursor-pointer"
              style={getRgbSliderStyle(key)}
              tabIndex={-1}
            />
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[key]}
              onChange={(e) => handleRgbChange(key, e.target.value)}
              className="w-10 px-1 py-1 border rounded text-sm text-center [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-inner-spin-button]:hidden [&::-moz-outer-spin-button]:hidden"
            />
          </div>
        ))}
      </div>

      {/* HSL 조절 */}
      <div className="w-full h-1/4 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <label className="font-medium">HSL</label>
        {(["h", "s", "l"] as HslKey[]).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-6 text-sm uppercase">{key}</span>
            <input
              type="range"
              min={key === "h" ? 0 : 0}
              max={key === "h" ? 360 : 100}
              value={hsl[key]}
              onChange={(e) => {
                const newHsl = { ...hsl, [key]: parseFloat(e.target.value) };
                // HSL 값을 먼저 업데이트
                setHsl(newHsl);

                // 그 다음 HEX와 RGB 업데이트
                const color = colord(newHsl);
                if (color.isValid()) {
                  setHex(color.toHex());
                  setRgb(color.toRgb());
                }
              }}
              className="flex-1 h-2 rounded appearance-none cursor-pointer"
              style={getHslSliderStyle(key)}
              tabIndex={-1}
            />
            <input
              type="number"
              min={0}
              max={key === "h" ? 360 : 100}
              value={Math.round(hsl[key])}
              onChange={(e) => handleHslChange(key, e.target.value)}
              className="w-10 px-1 py-1 border rounded text-sm text-center [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-inner-spin-button]:hidden [&::-moz-outer-spin-button]:hidden"
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      <Switch when={showModal}>
        <Match when={colorFormat === "hex"}>
          <Modal.Info duration={2000} message={`색상 코드 ${hex}가 클립보드에 복사되었습니다.`} />
        </Match>
        <Match when={colorFormat === "rgb"}>
          <Modal.Info duration={2000} message={`색상 코드 ${getFormattedColorCode()}가 클립보드에 복사되었습니다.`} />
        </Match>
        <Match when={colorFormat === "hsl"}>
          <Modal.Info duration={2000} message={`색상 코드 ${getFormattedColorCode()}가 클립보드에 복사되었습니다.`} />{" "}
        </Match>
      </Switch>
    </div>
  );
}
