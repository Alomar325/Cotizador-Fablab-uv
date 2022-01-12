import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 6rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 6rem 0 4rem;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-top: 4rem;
  }
`;

export const ServiceWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
`;

export const MinTitle = styled("h6")`
  font-size: 15px;
  line-height: 1rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

export const CardWrap = styled("div")`
box-shadow: 5px 6px 12px 0px rgba(0,0,0,0.4);
-webkit-box-shadow: 5px 6px 12px 0px rgba(0,0,0,0.4);
-moz-box-shadow: 5px 6px 12px 0px rgba(0,0,0,0.4);
  `;