import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  helperText?: string
  error?: string
}

export function Textarea({
  label,
  helperText,
  error,
  id,
  className = '',
  required,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="w-full">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-neutral-900 mb-1.5"
      >
        {label}
        {required && <span className="text-tiger-orange ml-1">*</span>}
      </label>
      <textarea
        id={textareaId}
        className={`
          w-full rounded-md border px-4 py-2.5 text-neutral-900
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          transition-colors resize-y
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

