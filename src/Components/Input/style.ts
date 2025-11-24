import styled from "styled-components";

export const Container = styled.div<{ $error?: string }>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div {
    border: 1px solid ${({ $error }) => ($error === "true" ? "#ff4d4f" : "#2a2a33")};
    border-radius: 10px;
    transition: 0.25s;

    box-shadow: inset 0 0 10px #00000050;

    &:focus-within {
      border-color: ${({ $error }) => ($error === "true" ? "#ff4d4f" : "#0a84ff")};
      box-shadow: 0 0 12px
        ${({ $error }) => ($error === "true" ? "#ff4d4f55" : "#0a84ff55")};
    }
  }
`;

export const Input = styled.input<{ $error?: string }>`
  width: 100%;
  background: transparent;
  border: none;
  padding: 12px;
  font-size: 14px;
  color: white;

  caret-color: ${({ $error }) => ($error === "true"  ? "#ff4d4f" : "#0a84ff")};

  &::placeholder {
    color: ${({ $error }) => ($error === "true"  ? "#ff9696" : "white")};
  }

  &:focus-visible {
    outline: 0;
  }

  &:focus {
    outline: none;
  }

 &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background: transparent !important;
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0) inset !important;
    -webkit-text-fill-color: white !important;
    transition: background-color 9999s ease-in-out 0s;
  }
`;


export const Span = styled.span`
    font-size: 0.825rem;

`;