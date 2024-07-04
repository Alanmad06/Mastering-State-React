import "../styles/Footer.css";

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <h3 className="footer__logo">PROJECT</h3>
      <div className="footer__info">
        <div className="footer__info-street-email">
          <p className="footer__info-street">
            123 Street, <br />
            Anytown, USA 12345
          </p>
          <p className="footer__info-email"> hello@website.com</p>
        </div>
        <p className="footer__info-date">
          © {new Date().getFullYear()} Project. All rights reserved
        </p>
      </div>
    </footer>
  );
}
