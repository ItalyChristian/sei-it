import { formatInTimeZone } from "date-fns-tz";
import * as styles from "./styles.css";

export interface SubheadingProps {
  title: string;
  description?: string;

  referenceDate?: string;
  timezone?: string;
}

export const Subheading = ({
  title,
  description,
  referenceDate,
  timezone = "America/Sao_Paulo",
}: SubheadingProps) => {
  const dateObj = referenceDate ? new Date(referenceDate) : null;
  const isValidDate = dateObj !== null && !isNaN(dateObj.getTime());

  const formattedDate = isValidDate
    ? formatInTimeZone(dateObj, timezone, "dd/MM/yyyy 'às' HH:mm")
    : null;

  return (
    <div className={styles.heading}>
      <div className={styles.headingContent}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {formattedDate && (
        <div
          className={styles.dateBox}
          title="Horário de referência do sistema"
        >
          <span className={styles.dateLabel}>Referência</span>
          <span className={styles.dateValue}>{formattedDate}</span>
        </div>
      )}
    </div>
  );
};
