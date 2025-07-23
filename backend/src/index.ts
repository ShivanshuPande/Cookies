import express from "express" ;
import cookieParser from "cookie-parser";
import cors from "cors" ;
import jwt from "jsonwebtoken"


const app = express() ;
const JWT_SECRET  = "jwt1234"
app.use(cookieParser());
app.use(cors({
    credentials: true , 
    origin : "http://localhost:5173"
}))
app.use(express.json());


app.post("/signin", (req,res)=>{
    const email  : req.body.email;
    const password : req.body.password;

    const token = jwt.sign({
        id :1
    } , JWT_SECRET);
    res.cookie("token"  , token);
    res.send("logged in!!!")

} );


app.get("/" , (req ,res)=>{

})

