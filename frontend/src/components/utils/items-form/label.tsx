interface ILabelProps {
  htmlFor: string;
  text: string;
  required?: boolean;
}

export function Label({ htmlFor, text, required }: ILabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {text}
      {required && (
        <span className="text-red-500 text-sm ml-1" title="Campo obrigatório">
          *
        </span>
      )}
    </label>
  );
}
