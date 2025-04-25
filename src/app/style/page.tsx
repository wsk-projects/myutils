import Card from "@/components/ui/common/Card";
import ClampCalculator from "./render/ClampCalculator";

export default function Style() {
  return (
    <div id="style-page" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card
        title="🔢 CSS Clamp Calculator"
        description="자연스럽게 변화하는 반응형 수치를 계산해드려요.\n예를 들어 md(768px)에서 xl(1280px) 사이의 부드러운 변화값을 생성합니다."
      >
        <ClampCalculator />
      </Card>

      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
