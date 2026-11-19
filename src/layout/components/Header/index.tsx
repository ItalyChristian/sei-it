"use client";

import { useAuth } from "@/shared/contexts/session.context";
import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as styles from "./styles.css";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const isAuthenticated = Boolean(user);

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/" aria-label="SeiIt home" className={styles.logo}>
          Sei It.
        </Link>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <span className={styles.userName}>Olá, {user?.nome}</span>
              <Button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link href="#login" className={styles.linkLogin}>
                Log in
              </Link>
              <Button id="#open-ticket" className={btnPrimary}>
                Say something
              </Button>
            </>
          )}
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
          className={styles.mobileNav}
        >
          {isAuthenticated ? (
            <>
              <span className={styles.mobileUserName}>Olá, {user?.nome}</span>
              <Button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
                style={{ padding: "12px 32px", fontSize: "18px" }}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      )}
    </header>
  );
};
