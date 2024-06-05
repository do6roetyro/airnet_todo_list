import React from "react";
import logo from "../../assets/images/git.svg"


const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="main-footer__wrapper wrapper">
        <a
          className="main-footer__link main-footer__link--github link"
          href="https://github.com/do6roetyro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="visually-hidden">Гитхаб</span>
          <img
            src={logo as unknown as string}
            alt="Гитхаб"
            className="social__logo"
            width={50}
            height={50}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
