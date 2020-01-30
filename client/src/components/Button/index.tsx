import React from "react";
import styled from "styled-components";
import { noop } from "../../utils/fn";

const ButtonContainer = styled.button`
  color: ${props => props.theme.color.text};
  border: ${props => props.theme.spacing.border} solid
    ${props => props.theme.color.text};
  border-radius: ${props => props.theme.spacing.borderRadius};
  margin: ${props => props.theme.spacing.default};
  padding: ${props => props.theme.spacing.default};
`;

export default function Button(prop: { onClick?: Function; children: any }) {
  const { onClick = noop, children = "" } = prop;
  return (
    <ButtonContainer onClick={e => onClick(e)}>{children}</ButtonContainer>
  );
}
