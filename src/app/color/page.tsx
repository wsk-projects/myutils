import ColorTool from "./render/ColorTool";

export default function ColorPage() {
  return (
    <div className="w-full h-full flex justify-center items-center p-4 gap-4">
      {/* 색상 팔레트 */}
      <section className="w-1/4 h-full flex">
        <ColorTool />
      </section>

      {/* 화면 레이아웃 예시 */}
      <section className="w-3/4 h-full flex">
        <div className="flex-1 rounded-lg shadow-md p-4 bg-white">BigContent</div>
      </section>
    </div>
  );
}
