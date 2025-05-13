import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

interface IEditActionProps {
  to: string;
}

export function EditAction({ to }: IEditActionProps) {
  return (
    <Link to={to}>
      <SquarePen className="w-4 h-4 text-orange-500" />
    </Link>
  );
}
