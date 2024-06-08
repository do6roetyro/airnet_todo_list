import React from "react";
import git from "../../assets/images/git.svg";
import tg from "../../assets/images/tg.svg";
import SocialLink from "./SocialLink";

interface FooterProps {
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className="main-footer">
      <div className="main-footer__wrapper wrapper">
        <div className="main-footer__social social">
          <SocialLink
            url="https://github.com/do6roetyro"
            socialName="github"
            logo={git as unknown as string}
          ></SocialLink>
          <SocialLink
            url="https://t.me/Do6poeytpo"
            socialName="telegram"
            logo={tg as unknown as string}
          ></SocialLink>
        </div>
        <p className="main-footer__copyright copyright">
          <span>{copyright}</span>
          <span>Разработано dobroeytro</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
