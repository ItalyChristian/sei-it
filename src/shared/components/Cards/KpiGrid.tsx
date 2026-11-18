import { kpiGrid } from "./kpi-card.css";
import { KpiCard, KpiTone } from "./KpiCard";

export interface KpiItem {
  title: string;
  value: string | number;
  tone?: KpiTone;
}

interface KpiGridProps {
  items: KpiItem[];
}

export const KpiGrid = ({ items }: KpiGridProps) => {
  return (
    <div className={kpiGrid}>
      {items.map((item, index) => (
        <KpiCard
          key={index}
          title={item.title}
          value={item.value}
          tone={item.tone}
        />
      ))}
    </div>
  );
};
