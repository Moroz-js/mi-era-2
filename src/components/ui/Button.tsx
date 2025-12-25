import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'secondary-filled';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({
  variant,
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';
  
  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: disabled
      ? 'bg-brand-light-gray text-brand-gray cursor-not-allowed'
      : 'bg-brand-yellow text-brand-black hover:bg-brand-violet focus:ring-brand-violet',
    secondary: disabled
      ? 'bg-brand-light-gray text-brand-gray cursor-not-allowed border-2 border-brand-light-gray'
      : 'bg-transparent text-brand-black border-2 border-brand-black hover:bg-brand-red hover:text-brand-white hover:border-brand-red focus:ring-brand-red',
    'secondary-filled': disabled
      ? 'bg-brand-light-gray text-brand-gray cursor-not-allowed'
      : 'bg-brand-red text-brand-white hover:bg-brand-violet focus:ring-brand-violet',
  };
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
