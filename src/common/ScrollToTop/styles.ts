import styled from "styled-components";

export const ScrollUpContainer = styled("div")<any>`
  padding: 10px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  cursor: pointer;
  background: #00DBDE;
  -webkit-filter: drop-shadow(0px 0px 5px #00DBDE);
  filter:         drop-shadow(0px 0px 5px #00DBDE ); 
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${(p) => (p.show ? "visible" : "hidden")};
  opacity: ${(p) => (p.show ? "1" : "0")};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: #00DBDE;
    -webkit-filter: drop-shadow(0px 0px 10px #00DBDE);
  filter:         drop-shadow(0px 0px 10px #00DBDE ); 
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;
