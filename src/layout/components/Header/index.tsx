"use client";

import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
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

          <Button id="#open-ticket" className={btnPrimary}>
            Say something
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className={styles.mobileMenuButton}
        >
          {menuOpen ? <X /> : <Menu />}
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

          <Button
            id="#open-ticket"
            onClick={() => setMenuOpen(false)}
            className={btnPrimary}
            style={{ padding: "12px 32px", fontSize: "18px" }}
          >
            Say something
          </Button>
        </nav>
      )}
    </header>
  );
};
