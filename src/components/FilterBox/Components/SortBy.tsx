import { useState } from "react";
import styled, { useTheme } from "styled-components";
import RadioButtons from "../../Buttons/RadioButtons";


export default function MenuToggler({selectedSize,setSelectedSize}) {


    const ColorOptions = [
        {
            id:1,
            label:'XS',
            value:'xs'
        },
        {
            id:2,
            label:'S',
            value:'white'
        },
        {
            id:3,
            label:'M',
            value:'red'
        },
        {
            id:4,
            label:'L',
            value:'yellow'
        },
        {
            id:5,
            label:'XL',
            value:'grey'
        },
        {
            id:6,
            label:'XXL',
            value:'blue'
        },
    ]
    
    
    const SelectHandler = (id,e:{target: HTMLInputElement}) => {

        const value = e.target.value;

        if(selectedSize.some(obj => obj == value)) {
            setSelectedSize(selectedSize.filter(item => item != e.target.value));
        } else {
            setSelectedSize(prevState => ([...prevState,value]))
        }
        
    }
    
    return(
        <ItemContainer>
            <p>Sort By : </p>
            <div className="dropdown_options">
                {ColorOptions.map(Button => (
                    <RadioButtons selected={selectedSize.some(obj => obj === Button.value)} id={Button.id} value={Button.value} SelectHandler={SelectHandler} key={Button.id} label={Button.label}  />
                ))}
            </div>
        </ItemContainer>
    )
}

const ItemContainer = styled.div`
    padding:3rem;
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:${({theme}) => theme.body};
    max-width:40rem;

    & p {
        white-space:nowrap;
    }

    & .dropdown_options {
        display:grid;
        grid-template-columns:repeat(3,minmax(10rem,1fr));
        grid-gap:2rem;


        & label {
            font-size:1.6rem;
            padding:1rem .5rem;
            display:flex;
            gap:1rem;
        }
    }

`;