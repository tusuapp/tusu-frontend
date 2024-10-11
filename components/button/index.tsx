import React, { useEffect, useState } from "react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  type: string;
  onClick?: any;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  height?: number | string;
  style?: React.CSSProperties
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  type,
  onClick,
  className,
  loading,
  disabled,
  height = '',
  style
}) => {
  const [isLoading, setIsLoading] = useState(false);
  let classNames = "";

  useEffect(() => {
    if (loading === undefined || loading === isLoading) return;

    setIsLoading(loading);
  }, [loading]);

  switch (type) {
    case "primary":
      classNames = "btn btn-brand";
      break;
    case "link":
      classNames = "btn btn-link";
    default:
      break;
  }

  if (href) {
    return (
      <a href={href}>
        <button
          type="button"
          style={{ height: height, ...style }}
          className={`${classNames} ${className}`}
          onClick={onClick}
        >
          {isLoading ? <Spinner /> : children}
        </button>
      </a>
    );
  }

  return (
    <button
      type="submit"
      style={{ height: height, ...style }}
      className={`${classNames} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;

const Spinner: React.FC = () => {
  return (
    <span
      className="spinner-border"
      role="status"
      style={{ width: "1rem", height: "1rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </span>
  );
};
