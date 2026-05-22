import React from "react";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { navLinks } from "./NavbarHelper";
import { useNavbar } from "./useNavbar";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, scrolled, location, pageTitle, handleMobileToggle, handleCloseMobile, handleGoBack } = useNavbar();
  const isHome = location.pathname === "/";

  return (
    <>
      <header className={`navbar-header ${scrolled ? "scrolled" : "not-scrolled"}`}>
        <div className="navbar-container">
          <div className="navbar-flex">
            <div className={`nav-left-slot ${!isHome ? "with-back-btn" : ""}`}>
              {location.pathname !== "/" ? (
                <button onClick={handleGoBack} className="nav-back-btn" aria-label={t("navbar.goBack")}><ArrowLeft size={16} strokeWidth={1.5} className="back-icon-svg" /></button>
              ) : (
                <Link to="/" className="logo-text-link">{t("navbar.homeLink")}</Link>
              )}
            </div>

            <div className={`nav-center-slot ${!isHome ? "with-back-btn" : ""}`}>
              {location.pathname !== "/" && <span className="page-title">{pageTitle()}</span>}
            </div>

            <div className={`nav-right-slot ${!isHome ? "with-back-btn" : ""}`}>
              <nav className="desktop-nav">
                {navLinks.map((link) => (
                  <Link key={link.key} to={link.path} className={`nav-link ${location.pathname === link.path ? "active" : ""}`}>
                    {t(`navbar.${link.key}`)}
                    <span className="nav-underline" />
                  </Link>
                ))}
              </nav>

              <button className="mobile-menu-btn" onClick={handleMobileToggle} aria-label={isOpen ? t("navbar.closeMenu") : t("navbar.openMenu")} aria-expanded={isOpen}><div className={`hamburger-pill-icon ${isOpen ? 'open' : ''}`}><span className="hamburger-line line-1" /><span className="hamburger-line line-2" /><span className="hamburger-line line-3" /></div></button>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <>
          <div className="mobile-overlay" onClick={handleCloseMobile} aria-hidden="true" />
          <div className="mobile-drawer">
            <div className="drawer-header">
              <span className="drawer-title">{t("navbar.menu")}</span>
              <button onClick={handleCloseMobile} className="drawer-close-btn" aria-label={t("navbar.closeMenu")}><X size={24} /></button>
            </div>
            <nav className="drawer-nav">
              {navLinks.map((link, index) => (
                <Link key={link.key} to={link.path} onClick={handleCloseMobile} className={`drawer-link drawer-link-animated drawer-link-${index} ${location.pathname === link.path ? "active" : ""}`}>
                  {t(`navbar.${link.key}`)}
                  <span className="drawer-underline" />
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;