import { CircleAlert } from "lucide-react";

interface AlertInfoProps {
  message: string;
}

export function AlertInfo({ message }: AlertInfoProps) {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 flex gap-3 items-center my-4">
      <CircleAlert className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
}
