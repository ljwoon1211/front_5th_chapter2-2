interface FormFieldProps {
  label?: string;
  id?: string;
  type: "text" | "number";
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
}

export const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`mb-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};
