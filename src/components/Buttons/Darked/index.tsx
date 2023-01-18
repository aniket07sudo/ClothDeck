import styles from "./style.module.scss";
import styled, {useTheme} from 'styled-components';

export default function DarkButton(props:any) {

    return (
        <DarkedContainer>
            <input readOnly {...props} value={props.label} />
        </DarkedContainer>
    )
}

const DarkedContainer = styled.div`
    border:1px solid ${({theme}) => theme.text};
    background-color:${({theme}) => theme.text};
    height:100%;
    max-height:6rem;
    & input {
        background-color: transparent;
        border: none;
        color:${({theme}) => theme.body};
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