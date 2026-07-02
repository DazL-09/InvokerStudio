import React from "react";

interface ButtonProps {
  variant?: "primary" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  variant = "outline",
  size = "md",
  href,
  onClick,
  children,
  ariaLabel,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const sizeStyles: Record<string, string> = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const base = `inline-block rounded-full font-medium transition-all ${sizeStyles[size]}`;

  const variants: Record<string, string> = {
    primary: `${base} bg-white text-black hover:bg-gray-200`,
    outline: `${base} border-chrome text-white hover:shadow-[0_0_20px_rgba(200,200,210,0.2)]`,
    accent: `${base} btn-accent`,
  };

  const Tag = href ? "a" : "button";
  const extraProps = href
    ? { href, target, rel }
    : { onClick };

  return (
    <Tag
      {...extraProps}
      aria-label={ariaLabel}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
