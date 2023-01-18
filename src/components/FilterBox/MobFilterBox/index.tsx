import styled, { useTheme } from "styled-components"
import ColorFilter from "../Components/Color"
import { useState } from "react";
import SizeFilter from "../Components/Size"
import BrandFilter from "../Components/Brand"
import TypeFilter from "../Components/Type"
import ArrowDownIcon from "../../../assets/icons/Arrow_Down"
import { devicemaxWidth } from "../../../constants/breakpoints";
import BottomSheet from "../../BottomSheet";
import MobTabs from "./Tabs";

export const FilterBoxHeight = 80;

export interface TabData {
    id:number,
    label:string,
    content:JSX.Element
}




export default function WebFilterBox() {

    const theme = useTheme();

    const [openBottomSheet,setOpenBottomSheet] = useState(false);

    const [selectedColor,setSelectedColor] = useState([]);

    const [selectedSize,setSelectedSize] = useState([]);

    const [selectedBrand,setSelectedBrand] = useState([]);

    const [selectedType,setSelectedType] = useState([]);

    const HandleBottomSheet = () => {
        setOpenBottomSheet(!openBottomSheet)
    }

    const Tabsdata : TabData[] = [
        {
            id:1,
            label:'Color',
            content:<ColorFilter selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        },
        {
            id:2,
            label:'Size',
            content:<SizeFilter selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        },
        {
            id:3,
            label:'Brand',
            content:<BrandFilter selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
        },
        {
            id:4,
            label:'Type',
            content:<TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
        }
    ]
    

    return(
        <FilterBoxContainer>
            <div className="Additional_Filters" onClick={HandleBottomSheet}>
                <p>Filter By</p>
                <ArrowDownIcon color={theme.text} />
            </div>
            <div className="Additional_Filters">
                <p>Sort By</p>
                <ArrowDownIcon color={theme.text} />
            </div>
            <BottomSheet show={openBottomSheet} toggler={setOpenBottomSheet}>
                <MobTabs Data={Tabsdata} />
            </BottomSheet>
        </FilterBoxContainer>
    )
}



const FilterBoxContainer = styled.div`
    border:1px solid ${({theme}) => theme.input.border};
    height:${FilterBoxHeight}px;
    padding:0 2rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position:sticky;
    top:0;
    @media only screen and ${devicemaxWidth.tablet} {
        height:${FilterBoxHeight / 1.5}px;
    }
    & .Additional_Filters {
        height:100%;
        display:flex;
        align-items:center;
        gap:0.5rem;

        & p {
            font-size:1.8rem;
            font-weight:700;
        }
        & > div {
            padding:0 2rem;
        }
    }

    & .sort_by {
        height:100%;
    }
`;

