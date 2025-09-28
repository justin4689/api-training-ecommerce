

 exports.getAllOrder = async (req , res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({message : "Order fetched successfully" , orders});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

exports.getOrderById = async (req , res) => {
    try {
        const {id} = req.params ;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({message : "Order not found"});
        }
        res.status(200).json({message : "Order fetched successfully" , order});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

exports.createOrder = async (req , res) => {
    try {
        const {userId , productId , total} = req.body ;
        const newOrder = new Order({userId , productId , total});
        await newOrder.save();
        res.status(201).json({message : "Order created successfully" , newOrder});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}


exports.orderDelete = async (req , res) => {
    try {
        const {id} = req.params ;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({message : "Order not found"});
        }
    await order.findByIdAndDelete(id);
        res.status(200).json({message : "Order deleted successfully"});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}