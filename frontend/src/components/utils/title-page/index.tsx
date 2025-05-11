interface ITitlePageProps {
  title: string;
}
export function TitlePage({ title }: ITitlePageProps) {
  return <h3 className="text-2xl font-bold mb-4 text-black">{title}</h3>;
}
