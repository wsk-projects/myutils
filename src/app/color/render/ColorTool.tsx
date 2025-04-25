"use client";

import { useState, useEffect } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { Copy, Check } from "lucide-react";
import Modal from "@/components/ui/style/Modal";
import { Switch } from "@/components/util/Switch";
import { Match } from "@/components/util/Switch";

extend([namesPlugin]);

type RgbKey = "r" | "g" | "b";
type HslKey = "h" | "s" | "l";
type ColorFormat = "hex" | "rgb" | "hsl";

export default function ColorTool() {
  const [hex, setHex] = useState("#808080"); // 편한 회색
  const [rgb, setRgb] = useState({ r: 128, g: 128, b: 128 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 50 });
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");

  // Sync RGB & HSL when HEX changes
  useEffect(() => {
    const color = colord(hex);
    if (color.isValid()) {
      setRgb(color.toRgb());
      setHsl(color.toHsl());
    }
  }, [hex]);

  // Sync HEX when RGB changes
  useEffect(() => {
    const next = colord(rgb).toHex();
    if (next.toLowerCase() !== hex.toLowerCase()) setHex(next);
  }, [rgb]);

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
    setCopied(true);
    setShowModal(true);
    setTimeout(() => setCopied(false), 2000);
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
      setRgb({ ...rgb, [key]: numValue });
    }
  };

  // HSL 값 변경 핸들러
  const handleHslChange = (key: HslKey, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const max = key === "h" ? 360 : 100;
      if (numValue >= 0 && numValue <= max) {
        const newHsl = { ...hsl, [key]: numValue };
        setHsl(newHsl);
        setHex(colord(newHsl).toHex());
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* 현재 색상 및 HEX 입력 */}
      <div className="flex-1 flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="w-full h-24 rounded border" style={{ backgroundColor: hex }} />
        <div>
          <label className="block text-sm font-medium">색상 코드</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={getFormattedColorCode()}
              readOnly
              className="flex-1 px-3 py-2 border rounded text-sm bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
              title="복사하기"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* 색상 형식 선택 버튼 */}
        <div className="flex flex-wrap gap-1 mt-2">
          {(["hex", "rgb", "hsl"] as ColorFormat[]).map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => handleFormatClick(format)}
              className={`px-2 py-1 rounded text-xs border ${
                colorFormat === format ? "bg-black text-white" : "bg-white text-gray-800"
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* RGB 조절 */}
      <div className="flex-1 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <label className="font-medium">RGB 조절</label>
        {(["r", "g", "b"] as RgbKey[]).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-6 text-sm uppercase">{key}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={rgb[key]}
              onChange={(e) => setRgb({ ...rgb, [key]: parseInt(e.target.value) })}
              className="flex-1"
            />
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[key]}
              onChange={(e) => handleRgbChange(key, e.target.value)}
              className="w-16 px-2 py-1 border rounded text-sm text-right"
            />
          </div>
        ))}
      </div>

      {/* HSL 조절 */}
      <div className="flex-1 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <label className="font-medium">HSL 조절</label>
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
                setHsl(newHsl);
                setHex(colord(newHsl).toHex());
              }}
              className="flex-1"
            />
            <input
              type="number"
              min={0}
              max={key === "h" ? 360 : 100}
              value={Math.round(hsl[key])}
              onChange={(e) => handleHslChange(key, e.target.value)}
              className="w-16 px-2 py-1 border rounded text-sm text-right"
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      <Switch when={showModal}>
        <Match when={true}>
          <Modal.Info
            message={`${
              colorFormat === "hex"
                ? `색상 코드 ${hex}`
                : colorFormat === "rgb"
                ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`
                : `HSL(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
            }가 클립보드에 복사되었습니다.`}
            onClose={() => setShowModal(false)}
          />
        </Match>
      </Switch>
    </div>
  );
}
