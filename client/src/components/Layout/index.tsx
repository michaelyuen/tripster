import styled from "styled-components";
import {
  spacingDefault,
  gridFullPageFormWidth,
  themeSpacingLarge,
  gridMaxWidth
} from "style/themeFunctions";

export const LayoutSmall = styled.div`
  width: ${gridFullPageFormWidth};
  margin: ${themeSpacingLarge} auto ${spacingDefault};
`;

export const LayoutLarge = styled.div`
  width: ${gridMaxWidth};
  padding: ${spacingDefault};
  margin: 0 auto;
`;
