const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
 const cookieParser = require("cookie-parser");
 const authRoutes = require("./routes/authRoutes");
 const path = require("path");
//  const userRoutes = require("./routes/user");

 const productRoutes = require("./routes/productRoutes");
//  const orderRoutes = require("./routes/order");

const app = express();




app.use(express.json());
app.use(cookieParser());
// 3️⃣ Expose le dossier uploads pour que le front puisse accéder aux images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));







app.use("/api/auth" , authRoutes);
// app.use("/api/user" , userRoutes);
app.use("/api/product" , productRoutes);
// app.use("/api/order" , orderRoutes);



connectDB();

 app.get("/",(req,res) => {
    res.send("Hello World");
 })

 app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
 });
