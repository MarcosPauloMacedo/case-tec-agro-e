import { useNavigate } from "react-router-dom";

export function ButtonBack() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end py-4">
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
