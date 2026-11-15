"use client";

import Link from "next/link";
import { useState } from "react";
import * as styles from "./styles.css";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/" aria-label="SeiIt home" className={styles.logo}>
          Sei It.
        </Link>

        <div className={styles.actions}>
          <Link href="#login" className={styles.linkLogin}>
            Log in
          </Link>
          <Link href="#courses" className={styles.btnPrimary}>
            Say something
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className={styles.mobileMenuButton}
          // style={{ display: "flex", zIndex: 30 }}
        >
          {menuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
              <path
                d="m6 6 12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M3 7h18M3 12h18M3 17h18"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            backgroundColor: "white",
          }}
        >
          <Link
            href="#login"
            onClick={() => setMenuOpen(false)}
            className={styles.linkLogin}
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Log in
          </Link>
          <Link
            href="#courses"
            onClick={() => setMenuOpen(false)}
            className={styles.btnPrimary}
            style={{ padding: "12px 32px", fontSize: "18px" }}
          >
            Say something
          </Link>
        </nav>
      )}
    </header>
  );
};
