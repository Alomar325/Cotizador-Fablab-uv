import { StyledAltButton } from "./styles";
import { ButtonProps } from "../../types";

export const AltButton = ({
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledAltButton color={color} fixedWidth={fixedWidth} onClick={onClick}>
    {children}
  </StyledAltButton>
);
