import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface IViewActionProps {
  to: string;
}

export function ViewAction({ to }: IViewActionProps) {
  return (
    <Link to={to}>
      <Eye className="w-4 h-4 text-blue-500" />
    </Link>
  );
}
