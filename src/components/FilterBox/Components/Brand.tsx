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


export default function MenuToggler({selectedBrand,setSelectedBrand}) {

    const theme = useTheme();


    const ColorOptions = [
        {
            id:1,
            label:'Nike',
            value:'nike',
            icon:() => <NikeIcon width={20} height={20} color={theme.text} />
        },
        {
            id:2,
            label:'Adidas',
            value:'adidas',
            icon:() => <Adidasicon width={20} height={20} color={theme.text} />
        },
        {
            id:3,
            label:'Jordan',
            value:'jordan',
            icon:() => <JordanIcon width={20} height={20} color={theme.text} />
        },
        {
            id:4,
            label:'Puma',
            value:'puma',
            icon:() => <PumaIcon width={20} height={20} color={theme.text} />
        },
        {
            id:5,
            label:'Reebok',
            value:'reebok',
            icon:() => <ReebokIcon width={20} height={20} color={theme.text} />
        },
        {
            id:6,
            label:'Vans',
            value:'vans',
            icon:() => <VansIcon width={20} height={20} color={theme.text} />

        },
    ]
    
    
    const SelectHandler = (id,e:{target: HTMLInputElement}) => {

        const value = e.target.value;

        if(selectedBrand.some(obj => obj == value)) {
            setSelectedBrand(selectedBrand.filter(item => item != e.target.value));
        } else {
            setSelectedBrand(prevState => ([...prevState,value]))
        }
        
    }
    
    return(
        <ItemContainer>
            {/* <p>Select Brand</p> */}
            <div className="dropdown_options">
                {ColorOptions.map(Button => (
                    <RadioButtons Icon={Button.icon} selected={selectedBrand.some(obj => obj === Button.value)} id={Button.id} value={Button.value} SelectHandler={SelectHandler} key={Button.id} label={Button.label}  />
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