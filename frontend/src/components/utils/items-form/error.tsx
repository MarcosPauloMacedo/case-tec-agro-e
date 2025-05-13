import type { FieldError } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface IErrorFormProps {
  error: FieldError | undefined;
}

export function ErrorForm({ error }: IErrorFormProps) {
  return (
    <Fragment>
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </Fragment>
  );
}
