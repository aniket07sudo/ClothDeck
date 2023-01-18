import { useState } from "react";
import styled, { useTheme } from "styled-components";
import RadioButtons from "../../Buttons/RadioButtons";
import NikeIcon from "../../../assets/icons/Brand_Logo/Nike"
import Adidasicon from "../../../assets/icons/Brand_Logo/Adidas"
import JordanIcon from "../../../assets/icons/Brand_Logo/Jordon"
import PumaIcon from "../../../assets/icons/Brand_Logo/Puma"
import ReebokIcon from "../../../assets/icons/Brand_Logo/Reebok"
import VansIcon from "../../../assets/icons/Brand_Logo/Vans"
import DarkButton from "../../Buttons/Darked";


export default function MenuToggler({selectedType,setSelectedType}) {


    const ColorOptions = [
        {
            id:1,
            label:'Football Shirt',
            value:'football',
        },
        {
            id:2,
            label:'Basketball Shirt',
            value:'basketball',
        }
    ]
    
    
    const SelectHandler = (id,e:{target: HTMLInputElement}) => {

        const value = e.target.value;

        if(selectedType.some(obj => obj == value)) {
            setSelectedType(selectedType.filter(item => item != e.target.value));
        } else {
            setSelectedType(prevState => ([...prevState,value]))
        }
        
    }
    
    return(
        <ItemContainer>
            {/* <p>Select Type</p> */}
            <div className="dropdown_options">
                {ColorOptions.map(Button => (
                    <RadioButtons Icon={Button.icon} selected={selectedType.some(obj => obj === Button.value)} id={Button.id} value={Button.value} SelectHandler={SelectHandler} key={Button.id} label={Button.label}  />
                ))}
            </div>
            <div className="submit">
                <DarkButton label="Apply" />
            </div>
        </ItemContainer>
    )
}

const ItemContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:${({theme}) => theme.body};
    max-width:40rem;
    padding:2rem;


    & p {
        white-space:nowrap;
    }

    & .dropdown_options {
        display:grid;
        grid-template-columns:repeat(2,minmax(14rem,1fr));
        grid-gap:2rem;


        & label {
            font-size:1.6rem;
            padding:1rem .5rem;
            display:flex;
            gap:1rem;
        }
    }

`;