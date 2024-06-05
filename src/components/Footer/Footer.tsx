import React from "react";
import logo from "../../assets/images/git.svg";

interface FooterProps {
  url: string;
  link_name: string;
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ url, link_name, copyright }) => {
  return (
    <footer className="main-footer">
      <div className="main-footer__wrapper wrapper">
        <a
          className="main-footer__link main-footer__link--github link"
          href={url}
          //   href="https://github.com/do6roetyro"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <span className="visually-hidden">Гитхаб</span> */}
          <span className="visually-hidden">{link_name}</span>
          <img
            src={logo as unknown as string}
            alt={link_name}
            className="social__logo"
            width={50}
            height={50}
          />
        </a>
        <p className="main-footer__copyright copyright">
            <span>{copyright}</span>
           <span>Разработано dobroeytro</span> 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
