interface IFormProps extends React.HTMLProps<HTMLFormElement> {}

export function Form({ ...rest }: IFormProps) {
  return (
    <form
      {...rest}
      className="space-y-4 border border-gray-200 p-6 rounded-lg bg-white mt-6"
    />
  );
}
