import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 8rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 5rem 0 4rem;
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

export const Dot = styled("p")`
  border:none;
  border-top:1px dotted #f00; 
  color:#fff;
  background-color:#fff;
  height:1px;
  width:50%;
  `;

export const CircleBlock = styled("div")`
  background-color:#fff;
  color:#fff; 
  border:0px solid #fff; 
  border-radius:45px;
  height:256px;
  width:256px;
  margin-left:15%;

  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 1025px) {
    margin-left:0%;
  }

  @media only screen and (max-width: 995px) {
    margin-left:0%;
  }

  
`

export const DeskDiv = styled("div")`

  @media only screen and (max-width: 995px) {
    display:none;
  }
  
`
export const MobileDiv = styled("div")`
  display:none;
  text-align:center;
  
  @media only screen and (max-width: 995px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    padding-bottom:32px;
  }

  @media only screen and (max-width: 769px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 35%;
    padding-bottom:32px;
  }
  @media only screen and (max-width: 426px) {
    display:inline-block;
    padding-left:12%;
    margin:10px 10px;
    
    padding-bottom:32px;
  }
  @media only screen and (max-width: 330px) {
    display:inline-block;
    padding-left:5%;
    margin:10px 10px;
    
    padding-bottom:32px;
  }
  
`