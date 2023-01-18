import styled, { keyframes } from "styled-components";

interface LoaderProps {
    width?:number,
    height?:number
}

const defaultProps: LoaderProps = {
    width:5,
    height:5
}

const LoaderComponent = function({width,height}:LoaderProps) {

    return (
        <Loader width={width} height={height}></Loader>
    )
}

LoaderComponent.defaultProps = defaultProps;

export default LoaderComponent;

const spin = keyframes`
    0 % {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg)
    }
`;

const Loader = styled.div`
    
    border: 0.5rem solid ${({theme}) => theme.input.border};
    border-top: 0.5rem solid ${({theme}) => theme.text};
    border-radius: 50%;
    width:${props => props.width}rem;
    height:${props => props.height}rem;
    margin:0 auto;    
    animation:${spin} 0.45s linear infinite;
`;