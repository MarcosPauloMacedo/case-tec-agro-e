interface ITitlePageProps {
  title: string;
}
export function TitlePage({ title }: ITitlePageProps) {
  return <h3 className="text-2xl font-bold mt-3 text-emerald-900">{title}</h3>;
}
