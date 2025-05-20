import { cn } from "../../../lib/cn";

interface IFormProps extends React.HTMLProps<HTMLFormElement> {}

export function Form({ ...rest }: IFormProps) {
  return (
    <form
      {...rest}
      className={cn(
        "space-y-4 border border-gray-200 p-6 rounded-lg bg-gray-50 mt-6",
        rest.className
      )}
    />
  );
}
