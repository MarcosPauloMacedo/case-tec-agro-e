import type { InputHTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: IInputProps) {
  return (
    <input
      {...rest}
      className={cn('mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black', rest.className)}
    />
  );
}
