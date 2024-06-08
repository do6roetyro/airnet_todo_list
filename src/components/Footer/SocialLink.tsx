import React from "react";

interface SocialLinkProps {
  url: string;
  socialName: string;
  logo: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ url, socialName, logo }) => {
  return (
    <a
      className={`social__link social__link--${socialName} link`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="visually-hidden">{socialName}</span>
      <img
        src={logo}
        alt={socialName}
        className="social__logo"
        width={50}
        height={50}
      />
    </a>
  );
};

export default SocialLink;
