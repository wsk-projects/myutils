import { Card } from "@/components/ui/style/Card";
import ClampCalculator from "./render/ClampCalculator";

export default function Style() {
  return (
    <div id="style-page" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card.Container>
        <Card.Title>🔢 CSS Clamp Calculator </Card.Title>
        <Card.Description>
          자연스럽게 변화하는 반응형 수치를 계산해드려요.
          <br />
          예를 들어 md(768px)에서 xl(1280px) 사이의 부드러운 변화값을 생성합니다.
        </Card.Description>
        <ClampCalculator />
      </Card.Container>

      <Card.Container>
        <Card.Title>Title</Card.Title>
        <Card.Description>description</Card.Description>
      </Card.Container>

      <Card.Container>
        <Card.Title>Title</Card.Title>
        <Card.Description>description</Card.Description>
      </Card.Container>

      <Card.Container>
        <Card.Title>Title</Card.Title>
        <Card.Description>description</Card.Description>
      </Card.Container>

      <Card.Container>
        <Card.Title>Title</Card.Title>
        <Card.Description>description</Card.Description>
      </Card.Container>

      <Card.Container>
        <Card.Title>Title</Card.Title>
        <Card.Description>description</Card.Description>
      </Card.Container>
    </div>
  );
}
