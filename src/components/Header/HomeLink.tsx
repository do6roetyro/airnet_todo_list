import React from "react";
import { Link } from "react-router-dom";

interface HomeLinkProps {
  title: string;
}

const HomeLink: React.FC<HomeLinkProps> = ({title}) => {
  return (
    <Link to="/" className="main-header__link link">
      {title}
    </Link>
  );
};

export default HomeLink;
