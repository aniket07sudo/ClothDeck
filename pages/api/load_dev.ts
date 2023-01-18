import { ApiHandler } from "../../lib/apiHandler";
import Item from "../../models/ItemModel";
import * as fs from 'fs'
import path from "node:path/win32";
import Variant from "../../models/VariantModel";



// const ItemData = JSON.parse(fs.readFileSync(path.join(__dirname,`Items.json`),'utf-8'));

const ImportItemData = async () => {
    
    const jsonDirectory = path.join(process.cwd(),'dev-data');

    
    
    
    try {
        // const fileContents = await fs.readFileSync(jsonDirectory + '/items.json','utf-8');
        const fileContents = await fs.readFileSync(jsonDirectory + '/variants.json','utf-8');
        // const Items = await Item.create(JSON.parse(fileContents));
        const Variants = await Variant.create(JSON.parse(fileContents));
        console.log("Item Data Successfully Loadeded",Variants);
         
    } catch(err) {
        console.log("Error",err);
    }
}


export default ApiHandler({
    get:ImportItemData
})