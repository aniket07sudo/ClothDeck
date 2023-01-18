import Layout from "../../src/components/ProviderLayout"
import {motion} from 'framer-motion'

export default function Contact() {

    return(
        <motion.div>
            <p>hi</p>
        </motion.div>
    )
}

Contact.getLayout = function getLayout(page:any) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }