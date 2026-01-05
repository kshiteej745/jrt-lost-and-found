import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  helperText?: string
  error?: string
}

export function Input({
  label,
  helperText,
  error,
  id,
  className = '',
  required,
  ...props
}: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-neutral-900 mb-1.5"
      >
        {label}
        {required && <span className="text-tiger-orange ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={`
          w-full rounded-md border px-4 py-2.5 text-neutral-900
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

