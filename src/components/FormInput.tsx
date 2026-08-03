export const fieldClassName =
  "rounded-lg border border-ink/20 px-3 py-2 text-sm outline-none focus:border-sakura";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function FormInput({ label, id, className = "", ...props }: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input id={id} className={`mt-1 w-full ${fieldClassName} ${className}`} {...props} />
    </div>
  );
}

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
};

export function FormTextarea({ label, id, className = "", ...props }: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea id={id} className={`mt-1 w-full ${fieldClassName} ${className}`} {...props} />
    </div>
  );
}
