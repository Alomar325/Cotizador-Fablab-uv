import styled from "styled-components";

export const StyledButton = styled("button")<any>`
  background: ${(p) => p.color || "#00DBDE"};
  color: ${(p) => (p.color ? "#fff" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 0px solid #00DBDE;
  border-radius: 15px;
  padding: 13px 0;
  cursor: pointer;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 219, 222,255); 
  box-shadow: 0px 0px 10px 0px rgba(0, 219, 222,255);
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;

  &:hover{
    -webkit-box-shadow: 0px 0px 10px 0px rgba(255,255,255, 1); 
    box-shadow: 0px 0px 10px 0px rgba(255,255,255, 1);
    color: #00DBDE;
    border: 0px solid #00DBDE;
    background-color: #fff;
  }
`;

