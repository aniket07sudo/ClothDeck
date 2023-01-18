import styled, { useTheme } from "styled-components"
import MenuToggler from "./FilterWrapper";
import ColorFilter from "../Components/Color"
import { useState } from "react";
import SizeFilter from "../Components/Size"
import BrandFilter from "../Components/Brand"
import TypeFilter from "../Components/Type"

export const FilterBoxHeight = 80;


export default function WebFilterBox() {

    const [selectedColor,setSelectedColor] = useState([]);

    const [selectedSize,setSelectedSize] = useState([]);

    const [selectedBrand,setSelectedBrand] = useState([]);

    const [selectedType,setSelectedType] = useState([]);

    return(
        <FilterBoxContainer>
            <div className="Additional_Filters">
                <MenuToggler showLeft={false} label="Color">
                    <ColorFilter selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                </MenuToggler>
                <MenuToggler showLeft={false} label="Size">
                    <SizeFilter selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                </MenuToggler>
                <MenuToggler showLeft={false} label="Brand">
                    <BrandFilter selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                </MenuToggler>
                <MenuToggler showLeft={false} label="Type">
                    <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
                </MenuToggler>
            </div>
            <div className="sort_by">
                <MenuToggler showLeft label="Sort By">
                    <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
                </MenuToggler>
            </div>
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
    margin:4rem 0;
    position:sticky;

    & .Additional_Filters {
        height:100%;
        display:flex;
        & > div {
            padding:0 2rem;
        }
    }

    & .sort_by {
        height:100%;
    }
`;

