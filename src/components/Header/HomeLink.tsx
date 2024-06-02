import React from "react";
import { Link } from "react-router-dom";

interface HomeLinkProps {
  title: string;
}

const HomeLink: React.FC<HomeLinkProps> = (props) => {
  return (
    <Link to="/" className="main-header__link link">
      {props.title}
    </Link>
  );
};

export default HomeLink;
