import type { Bundle } from "@/types/strapi";

interface BundleCardProps {
  bundle: Bundle;
  sessionsLabel: string;
  perSessionLabel: string;
}

export function BundleCard({ bundle, sessionsLabel, perSessionLabel }: BundleCardProps) {
  const perSession = bundle.Quantity > 0 ? (bundle.Price / bundle.Quantity).toFixed(2) : null;

  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-surface px-5 py-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-accent">
      <div className="pl-2">
        <h4 className="font-heading text-sm font-semibold text-foreground">{bundle.Title}</h4>
        <p className="text-xs text-muted">
          {bundle.Quantity} {sessionsLabel}
          {perSession && (
            <span className="ml-2 text-accent-hover">
              ({perSession} &euro; {perSessionLabel})
            </span>
          )}
        </p>
      </div>
      <span
        className="text-lg font-semibold text-accent"
        aria-label={`${bundle.Price.toFixed(2)} euros`}
      >
        {bundle.Price.toFixed(2)} &euro;
      </span>
    </div>
  );
}
