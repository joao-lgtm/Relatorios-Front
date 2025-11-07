import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid red;
    border-radius: 10px;

    width: 70px;
    height: 30px;
    
    display: flex;
    align-items: center;
`;


export const Button = styled.button`
    border: none;
    background-color: transparent;
    border-radius: 10px;
    background-position: center center;
    background-size: 30px;
    background-repeat: no-repeat;

    width: 30px;
    height: 30px;

    transform: translateX(0px);
    transition: transform 0.5s ease-in-out;

    

    cursor: pointer;

    &[data-theme="false"]{
        transform: translateX(37px);
        transition: transform 0.5s ease-in-out;
    }
`;