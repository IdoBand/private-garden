import React from 'react'

interface Props {
    border: string;
    backgroundColor: string,
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    borderRadius: string;
    width: string;
  }

  const Button: React.FC<Props> = ({ 
    border,
    backgroundColor,
    color,
    children,
    height,
    onClick,
    borderRadius,
    width,
  }) => { 
  return (
    <button 
      onClick={onClick}
      className="Button"
      style={{
         border: border,
         borderColor: 'rgb(211, 211, 211)',
         borderRadius: borderRadius,
         backgroundColor: backgroundColor,
         color: color,
         height,
         width,
      }}>
    {children}
    </button>
  );
}

export default Button;