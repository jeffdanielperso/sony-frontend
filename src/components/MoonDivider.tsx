interface MoonDividerProps {
  className?: string;
}

export function MoonDivider({ className = "" }: MoonDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-8 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
      {/* New moon */}
      <div className="h-3 w-3 rounded-full border border-accent/40" />
      {/* Waxing */}
      <div className="h-3 w-3 rounded-full border border-accent/40 bg-linear-to-r from-accent/50 to-transparent" />
      {/* Full moon */}
      <div className="h-3.5 w-3.5 rounded-full bg-accent/60" />
      {/* Waning */}
      <div className="h-3 w-3 rounded-full border border-accent/40 bg-linear-to-l from-accent/50 to-transparent" />
      {/* New moon */}
      <div className="h-3 w-3 rounded-full border border-accent/40" />
      <div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
    </div>
  );
}
