import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
    title: string;
    link: string
}

const NavLink: React.FC<NavLinkProps> = ({title, link}) => {
  return (
    <li className="main-nav__item">
      <Link to={`/${link}`} className="main-nav__link link">
        {title}
      </Link>
    </li>
  );
};

export default NavLink;
