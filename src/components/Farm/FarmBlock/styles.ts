import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 0rem 2rem ;

  @media only screen and (max-width: 1025px) {
    padding: 2rem 6rem;
  }
  @media only screen and (max-width: 769px) {
    padding: 2rem 3rem;
  }
  @media only screen and (max-width: 426px) {
    padding: 2rem 0rem ;
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

  text-transform: uppercase;
  color: #fff;
`;


export const Cimg = styled("img")`

  display: block;
  height: 366px;
  width: 800px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  -webkit-filter: drop-shadow(0px 0px 3px #fff);
  filter:         drop-shadow(0px 0px 3px #fff ); 

  @media only screen and (max-width: 426px) {
    height: 198px;
    width: 400px;
  }
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

export const CardDiv = styled("div")`
  background-color: rgba(0,0,0,0.8); 
  color: #fff;
  border: 2px solid #fff;
  border-radius: 10px; 
  padding: 20px;
`;

