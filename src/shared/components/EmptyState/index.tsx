import * as styles from "./styles.css";
import { EmptyStateProps } from "./types";

export function EmptyState({
  description,
  title,
  icon,
  action,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionClassName,
}: EmptyStateProps) {
  return (
    <div className={className ?? styles.container}>
      {icon && <div className={iconClassName ?? styles.icon}>{icon}</div>}
      {title && <h2 className={titleClassName ?? styles.title}>{title}</h2>}
      <p className={descriptionClassName ?? styles.description}>
        {description}
      </p>
      {action && (
        <div className={actionClassName ?? styles.action}>{action}</div>
      )}
    </div>
  );
}
