const mongoose = require('mongoose');
const Item = require('../models/ItemModel/index');
const fs = require('fs');

 mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
    dbName:'clothdeckDB'
  }).then(res => {
    require('../models/ItemModel/index');
      require('../models/ReviewModel/index');
      require('../models/UserModel/index');
      require('../models/VariantModel/index');
      require('../models/CategoryModel/index');
      require('../models/CartModel/index');
      console.log("Connected database");
      
  })

const ItemData = JSON.parse(fs.readFileSync(`${__dirname}/items.json`,'utf-8'));

const ImportItemData = async () => {
    try {
        await Item.create(ItemData);
        console.log("Item Data Successfully Loadeded");
         
    } catch(err) {
        console.log("Error",err);
    }
}

if(process.argv[2] === '--import-item') {
    ImportItemData();
}

module.exports = ImportItemData;