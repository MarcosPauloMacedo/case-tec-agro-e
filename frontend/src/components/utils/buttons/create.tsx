import { useNavigate } from "react-router-dom";

interface IButtonCreateProps {
    to: string;
}

export function ButtonCreate({ to }: IButtonCreateProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };

    return (
        <div className="flex justify-end py-4">
            <button onClick={handleClick} className="text-white px-4 py-2 rounded">
                Novo Cadastro
            </button>
        </div>
    )
}