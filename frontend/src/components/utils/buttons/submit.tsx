interface InputProps {
  title: string;
  className?: string;
}

export function ButtonSubmit({ title, className }: InputProps) {
  return (
    <div className="flex items-center justify-end mt-12">
      <button
        type="submit"
        className={className}
      >
        {title}
      </button>
    </div>
  );
}
