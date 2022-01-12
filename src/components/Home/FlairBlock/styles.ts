import styled from "styled-components";

export const RightBlockContainer = styled("section")`
  position: relative;
  padding: 2rem 0 6rem;

  @media only screen and (max-width: 1024px) {
    padding: 2rem 0 6rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 2rem 0 6rem;
  }
`;

export const Cimg = styled("img")`

  display: block;
  margin-left: auto;
  margin-right: auto;
  -webkit-filter: drop-shadow(0px 0px 25px rgb(127,169,236));
  filter:         drop-shadow(0px 0px 25px rgb(127,169,236)); 

`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-bottom: 4rem;
  }
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`;
