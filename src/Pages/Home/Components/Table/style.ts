import styled from "styled-components";

export const TableContainer = styled.div`
`;

export const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const TableHead = styled.thead`
  background-color: #990099;
`;

export const TableBody = styled.tbody`
    background-color: white;
`;

export const Th = styled.th`
  padding: 15px;

  &:first-child {
    border-top-left-radius: 15px;
    border-right: 1px solid black;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-left: 1px solid black;
  }

  &:not(:first-child):not(:last-child) {
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
`;

export const Td = styled.td`
  padding: 10px;
  white-space: nowrap;
  color: black;
  border: 1px solid;
`;

export const Tr = styled.tr``;
