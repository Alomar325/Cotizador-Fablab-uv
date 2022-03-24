import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export const HeaderSection = styled("header")`
  padding: 0.1rem 0.25rem;
  position: inline;
  width: 100%;
  top: 0;
  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
  background-color: rgba(11,11,11,1);

`;

export const LogoContainer = styled(Link)`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  
`;

export const GlowImg = styled("img")`


`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 140px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const ContactWrapper = styled("div")<any>`
  cursor: pointer;
  width: ${(p) => (p.width ? "100%" : "110px")};
  font-weight: 700;
  text-align: center;
  border-radius: 1.25rem;
  display: inline-block;
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 1025px) {
    display: block;
  }

  display: none;

  svg {
    fill: #00DBDE;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 1025px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1rem;
  
  color: #00DBDE;
  transition: color 0.2s ease-in;
  margin: 0.5rem 0.5rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #00DBDE;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)<any>`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: #00DBDE;
    text-underline-position: under;
    text-decoration: #00DBDE wavy underline;
  }
`;
