import styled from "styled-components"

export default function RadioButtons({label,Icon,SelectHandler,value,selected}) {


    return (
        <SizeContainer selected={selected}>
            <input onChange={SelectHandler} id={label} type={'checkbox'} name={label} value={value} />
            <label htmlFor={label}>{Icon && <Icon /> }{label}</label>
        </SizeContainer>
    )
}

const SizeContainer = styled.div`
    & input {
        display:none;
    }
    & input:disabled ~ label {
        color:${({theme}) => theme.input.border};
    }
    & label {
        cursor:pointer;
        width:8.5rem;
        height:6rem;
        font-size:1.8rem;
        font-weight:600;
        position:relative;
        padding:0.5rem 2rem;
        border:1.5px solid ${props => props.selected ? props.theme.input.borderActive : props.theme.input.border};
        display:flex;
        align-items:center;
        justify-content:center;
        transition:all .3s ease;
    }

`;