import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  helperText?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({
  label,
  helperText,
  error,
  options,
  id,
  className = '',
  required,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-neutral-900 mb-1.5"
      >
        {label}
        {required && <span className="text-tiger-orange ml-1">*</span>}
      </label>
      <select
        id={selectId}
        className={`
          w-full rounded-md border px-4 py-2.5 text-neutral-900 bg-white
          focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
        }
        required={required}
        {...props}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

