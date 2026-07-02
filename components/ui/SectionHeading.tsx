interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-chrome mb-16 text-center text-3xl font-bold ${className}`}>
      {children}
      <span className="mx-auto mt-2 block h-0.5 w-16 rounded-full bg-gradient-to-r from-accent to-chrome-light" />
    </h2>
  );
}
