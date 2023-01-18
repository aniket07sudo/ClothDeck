import styled, {useTheme} from 'styled-components';

export default function DarkButton(props:any) {

    return (
        <OutlinedContainer>
            <input {...props} value={props.label} readOnly  />
        </OutlinedContainer>
    )
}

const OutlinedContainer = styled.div`
    border:1px solid ${({theme}) => theme.text};
    max-height:6rem;
    margin:1rem 0;
    & input {
        background-color: transparent;
        border: none;
        color:${({theme}) => theme.text};
        font-size: 1.6rem;
        width: 100%;
        height: 100%;
        padding: 1.8rem;
        cursor: pointer;
        text-align: center;
        font-weight: 700;
        font-family: 'Urbanist',sans-serif;
    }
`;