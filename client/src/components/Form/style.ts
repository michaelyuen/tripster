import styled from "styled-components";
import { spacingDefault, fontSmall } from "style/themeFunctions";

export const FormContainer = styled.form`
  a {
    font-size: ${fontSmall};
  }

  > * {
    width: 100%;
    display: block;
    margin-bottom: ${spacingDefault};
  }

  h1,
  a {
    text-align: center;
  }
`;
