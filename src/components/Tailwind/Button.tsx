import React from 'react';

type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'slate' | 'blue' | 'red' | 'green';
  label: string | undefined;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  classes?: string;
};

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  color = 'slate',
  label,
  onClick,
  disabled = false,
  icon,
  classes = ''
}) => {
  const sizeClasses = {
    xs: 'py-1 px-2.5 text-sm',
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2.5 px-5 text-base',
    xl: 'py-3.5 px-6 text-base',
  };

  const colorClasses = {
    slate: 'bg-slate-800 hover:bg-slate-700 focus:bg-slate-700',
    blue: 'bg-blue-600 hover:bg-blue-500 focus:bg-blue-500',
    red: 'bg-red-600 hover:bg-red-500 focus:bg-red-500',
    green: 'bg-green-600 hover:bg-green-500 focus:bg-green-500',
  };

  return (
    <button
      className={`${classes} flex items-center rounded-md ${sizeClasses[size]} ${colorClasses[color]} border border-transparent text-white transition-all shadow-sm hover:shadow focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="inline-block mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
