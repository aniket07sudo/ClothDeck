import Layout from "../src/components/ProviderLayout";
import "slick-carousel/slick/slick.css"; 
import HeroSlider from "../src/components/HeroSlider";
import Features from '../src/components/FeaturesSection';
import Productlist from '../src/components/ProductList';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';

import {manager} from '../lib/createConnection';
import Item from '../models/ItemModel';
import { memo, useCallback, useMemo } from "react";

export interface DataProp {
  id:number,
  title:string,
  category:string,
  price:number,
  discountedPrice:number,
  imageUrl:string,
  rating:number
}


function Home({ProductData}) {

  console.log("Index Home",ProductData);

  const MemoizedproductData = useMemo(() => {
    return ProductData;
  },[])
  
  // const CollTray = dynamic(() => import('../src/components/CollectionTray'),{
  //   ssr:false,
  //   loading:() => <p>Loading...</p>
  // })
  

  return (
    <>
      <HeroSlider />
      {/* <CollTray heading='Popular For You' subhead='We are proud of our new work and are happy to present them to you.' data={Data} /> */}
      <Features />
      <Productlist ProductData={MemoizedproductData} />
    </>
  )
}


// function CustomComparator(prevProps,nextProps) {
//   return prevProps.ProductData === nextProps.ProductData;
// }

// export default memo(Home,CustomComparator);
export default Home;




Home.getLayout = function getLayout(page:any) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}




export const getStaticProps: GetStaticProps = async context => {

    await manager.connect();

    // const VariantData = await Variant.find().populate({
    //   path:'itemId',
    //   select:'-description'
    // })
    const ItemData = await Item.find().populate('variants category').select('-description')

    // const VariantData = await Item.findOne({_id:req.query.id}).populate('reviews variants')
    console.log("ItemData",ItemData);
    
    return {
      props: {
        ProductData: JSON.parse(JSON.stringify(ItemData))
      },
      revalidate:10
    };
}