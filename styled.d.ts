import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      text_secondary: string;
      border: string;
      gray_800: string;
      teste: string;
    };
  }
}
