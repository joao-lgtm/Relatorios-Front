import styled, { keyframes } from "styled-components";

// Animação de fade-in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(108, 99, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: #6c63ff;
  color: white;
  padding: 25px 30px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const CloseButton = styled.button`
  background: #fff;
  color: #6c63ff;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: #e0e0ff;
  }
`;


export const Label = styled.div`
  display: flex;

`;