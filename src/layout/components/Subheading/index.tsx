import * as styles from "./styles.css";

export interface SubheadingProps {
  title: string;
  description?: string;
}

export const Subheading = ({ title, description }: SubheadingProps) => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
