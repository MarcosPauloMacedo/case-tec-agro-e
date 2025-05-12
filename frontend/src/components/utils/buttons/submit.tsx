interface InputProps {
  title: string;
}

export function ButtonSubmit({ title }: InputProps) {
  return (
    <div className="flex items-center justify-end mt-12">
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {title}
      </button>
    </div>
  );
}
