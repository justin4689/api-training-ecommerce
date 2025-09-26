 const mongoose  =  require  ("mongoose") ;


  const orderSchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true 
    } ,
    productId : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true 
    } ,
    
    total : {
        type : Number , 
        required : true
    }

  },{
    timestamps : true
  })


 module.exports = mongoose.model("Order" , orderSchema) ;