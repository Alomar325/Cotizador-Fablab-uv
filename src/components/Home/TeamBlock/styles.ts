import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 10rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
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

export const CardDiv = styled("div")`
  border-radius:15px; 
  color: #fff;
  height:480px; 
  background-color:#C80057;
  -webkit-box-shadow: 0px 0px 20px 0px #C80057; 
  box-shadow: 0px 0px 20x 0px #C80057;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 1025px) {
    margin-left:0%;
  }

  @media only screen and (max-width: 995px) {
    margin-left:0%;
  }

  &:hover{
    -webkit-box-shadow: 0px 0px 20px 0px #FF0070; 
    box-shadow: 0px 0px 20x 0px #FF0070;
    background-color:#FF0070;
  }
  `;