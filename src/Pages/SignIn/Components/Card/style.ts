import styled from "styled-components";

export const Container = styled.div<{ $isloading: string }>`
    position: relative;
    display: flex;
    width: 500px;
    height: 520px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 22px;

    
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);

    border-radius: 22px;
    box-shadow:
        0 8px 30px rgba(0, 0, 0, 0.45),
        0 0 80px rgba(0, 119, 255, 0.18);

    color: #fff;


   &::before {
    display: ${({ $isloading }) => ($isloading === "true" ? "block" : "none")};
    content: '';
    position: absolute;
    width: 250px;
    height: 150%;
    background: conic-gradient(
        #61A60E,
        #FCCE01,
        #FC4513,
        #0074C8,
        #61A60E
    );
    animation: rotate 4s linear infinite;
    border-radius: 20px;
}

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }

    &::after {
        content: '';
        position: absolute;
        inset: 7px;
        background: rgba(20, 20, 27, 1);
        border-radius: 18px;
        backdrop-filter: blur(14px);
        box-shadow: inset 0 0 20px #00000040;
    }

    > div {
        z-index: 1;
        width: 78%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.4rem;
        color: #fff;
        font-family: "Inter", sans-serif;

        h2 {
            font-size: 1.7rem;
            font-weight: 600;
            letter-spacing: 2px;
            color: #ffffffdd;
        }
    }
`;


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.9rem;
    width: 100%;

    button {
        background: linear-gradient(90deg, #007aff, #0055ff);
        border: none;
        color: #fff;
        padding: 1rem;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        letter-spacing: .5px;
        font-size: 1.05rem;
        transition: 0.25s;
        box-shadow: 0 4px 12px #003bff50;

        &:hover:not(:disabled) {
           opacity: 0.9;
            box-shadow: 0 6px 18px #003bff70;
        }

        &:active {
            transform: scale(0.97);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
`;
