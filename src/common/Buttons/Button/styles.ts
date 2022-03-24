import styled from "styled-components";

export const StyledButton = styled("button")<any>`
  background: ${(p) => p.color || "#0834fc"};
  color: ${(p) => (p.color ? "#fff" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 2px solid #0834fc;
  border-radius: 15px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;

  &:hover{
    color: #0834fc;
    border: 2px solid #0834fc;
    background-color: #fff;
  }
`;

