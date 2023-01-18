import { useState } from "react";
import styled, { useTheme } from "styled-components";
import RadioButtons from "../../Buttons/RadioButtons";
import DarkButton from "../../Buttons/Darked";
import OutlinedButton from "../../Buttons/Outlined"


export default function MenuToggler({selectedColor,setSelectedColor}) {


    const ColorOptions = [
        {
            id:1,
            label:'Black',
            color:'#262D33',
            value:'black'
        },
        {
            id:2,
            label:'White',
            color:'#fff',
            value:'white'
        },
        {
            id:3,
            label:'Red',
            color:'#D6484C',
            value:'red'
        },
        {
            id:4,
            label:'Yellow',
            color:'#FFE83B',
            value:'yellow'
        },
        {
            id:5,
            label:'Grey',
            color:'#B9B9B9',
            value:'grey'
        },
        {
            id:6,
            label:'Blue',
            color:'#1A9FF2',
            value:'blue'
        },
        // {
        //     id:7,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:8,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:9,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:10,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:11,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:12,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:13,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
        // {
        //     id:14,
        //     label:'Blue',
        //     color:'#1A9FF2',
        //     value:'blue'
        // },
    ]

    
    // const [selectedColor,setSelectedColor] = useState([]);
    
    const SelectHandler = (id,e:{target: HTMLInputElement}) => {

        const value = e.target.value;

        if(selectedColor.some(obj => obj == value)) {
            setSelectedColor(selectedColor.filter(item => item != e.target.value));
        } else {
            setSelectedColor(prevState => ([...prevState,value]))
        }
        
    }
    
    return(
        <ItemContainer>
            {/* <p>Select Color</p> */}
            <div className="dropdown_options">
                {ColorOptions.map(Button => (
                    <RadioButtons selected={selectedColor.some(obj => obj === Button.value)} id={Button.id} value={Button.value} SelectHandler={SelectHandler} key={Button.id} label={Button.label} Icon={() => <div style={{display:'block',backgroundColor:Button.color,width:20,height:20,borderRadius:'50%',border:'1px solid #e7e7e7'}}></div>} />
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
    justify-content:space-between;
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