import Layout from "../../src/components/ProviderLayout"
import CartComponent from "../../src/components/CartComponent"
import RespBottomSheet from "../../src/components/ResponsiveBottomSheet"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ProtectedRoute } from "../../lib/AuthCheck"

export default function cart() {

  const Router = useRouter();

  const [show,setShow] = useState(false);

  useEffect(() => {
      if(Router.asPath == '/cart') {
          setShow(true);
      } else {
        setShow(false);
      }
  },[Router.asPath])

    return (
      <ProtectedRoute>
          <div style={{width:'100%',padding:100}}>
              <p>Hi</p>
          </div>
        </ProtectedRoute>
    )
}

cart.getLayout = function getLayout(page:any) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }