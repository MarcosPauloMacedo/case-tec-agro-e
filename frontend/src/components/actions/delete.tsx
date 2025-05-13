import { CircleX } from "lucide-react";

interface IDeleteActionProps {
    onClick: () => void;
}

export function DeleteAction({ onClick }: IDeleteActionProps) {
    return (
        <CircleX onClick={onClick} className="w-4 h-4 text-red-500 cursor-pointer" />
    )
}