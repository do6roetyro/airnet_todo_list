import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
    title: string;
    link: string
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <li className="main-nav__item">
      <Link to={`/${props.link}`} className="main-nav__link link">
        {props.title}
      </Link>
    </li>
  );
};

export default NavLink;
