import { useNavigate } from "react-router-dom";

export function ButtonBack() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="flex justify-end">
      <button>Voltar</button>
    </div>
  );
}
