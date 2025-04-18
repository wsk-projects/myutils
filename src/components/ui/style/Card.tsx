function CardContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-6 space-y-4">{children}</div>;
}
function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="bg-gray-100 p-2 rounded text-sm text-gray-700">{children}</p>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-lg font-semibold text-gray-800">{children}</h1>;
}

export const Card = {
  Container: CardContainer,
  Title: CardTitle,
  Description: CardDescription,
};
