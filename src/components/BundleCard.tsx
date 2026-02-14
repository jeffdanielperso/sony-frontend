import type { Bundle } from "@/types/strapi";

interface BundleCardProps {
  bundle: Bundle;
  sessionsLabel: string;
}

export function BundleCard({ bundle, sessionsLabel }: BundleCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
      <div>
        <h4 className="text-sm font-semibold text-foreground">{bundle.Title}</h4>
        <p className="text-xs text-muted">
          {bundle.Quantity} {sessionsLabel}
        </p>
      </div>
      <span className="text-lg font-semibold text-accent">
        {bundle.Price.toFixed(2)} &euro;
      </span>
    </div>
  );
}
