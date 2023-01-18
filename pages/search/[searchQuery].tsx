import { useRouter } from "next/router"
import styled from "styled-components";
import Layout from "../../src/components/ProviderLayout"
import ProductCard from "../../src/components/ProductCard";
import { NavbarHeight } from "../../src/components/WebNavbar"
import dynamic from "next/dynamic";
import { devicemaxWidth } from "../../src/constants/breakpoints";
import { isMobile, isTablet } from "react-device-detect";

const WebFilter = dynamic(() => import("../../src/components/FilterBox/WebFilter"),{
    ssr:false,
    loading:() => <p>Loading...</p>
  })
  
  const MobFilter = dynamic(() => import("../../src/components/FilterBox/MobFilterBox"),{
    ssr:false,
    loading:() => <p>Loading...</p>
  })

export default function SearchQuery() {

    const Router = useRouter();

    const { searchQuery } = Router.query;

    const Productbag = (id) => {
        console.log("ID",id);
    }

    return(
        // <Wrapper>
        //     <div className="search_text_container">
        //         <p>Search Results For: <span>{searchQuery}</span></p>
        //     </div>
        //     <div className="filterBox">
        //         {(isTablet || isMobile) ? <MobFilter /> : <WebFilter />}
        //     </div>
        //     <div className="products">
        //         {Data.map((item,i) => (
        //             <ProductCard addBag={Productbag} key={item.id} item={item} />
        //         ))}
        //     </div>
        // </Wrapper>
        <></>
    )
}

const Wrapper = styled.div`
    padding:2rem;

    & .search_text_container {
        margin-bottom:2rem;
    }

    & p {
        font-size:1.6rem;
        & span {
            font-size:2rem;
            font-weight:600;
        }
    }

    & .products {
     
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(30rem,1fr));
        grid-column-gap: 3rem;
        grid-row-gap: 3rem;
        @media only screen and (max-width:850px) {
            grid-template-columns: repeat(auto-fit,minmax(22rem,1fr));
            grid-column-gap: 2rem;
            grid-row-gap: 2rem;
        }
        @media only screen and (max-width:450px) {
            grid-column-gap: 1rem;
            grid-row-gap: 2rem;
            grid-template-columns: repeat(auto-fit,minmax(16rem,1fr));
        }
    }

    & .filterBox {
        position:sticky;
        top:${NavbarHeight + 10}px;
        z-index:2;
        background-color:${({theme}) => theme.body};
        margin:3rem 0;

        @media only screen and ${devicemaxWidth.tablet} {
            top:1rem;
            grid-template-columns:repeat(auto-fit,minmax(30rem,1fr));
        }
    }
`;

// SearchQuery.getLayout = function getLayout(page:any) {
//     return (
//       <Layout>
//         {page}
//       </Layout>
//     )
//   }