import express from "express" ;
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser  from "cookie-parser";
import cors from 'cors';

const app = express();
const JWT_SECRET = "jwt1234";
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true ,
    origin : "http://localhost:5173"

}));


app.post("/signin" , (req  , res )=> {
    const email = req.body.email;
    const password = req.body.password;
    
    const token = jwt.sign({
        id : 1
    } , JWT_SECRET)
    res.cookie("token" , token)
    res.send("You are logged in ")
})

app.get("/" ,(req ,res)=>{
    const token = req.cookies.token

    const payload = jwt.verify("token" , JWT_SECRET) as JwtPayload;
    const userId = payload.id;
    res.send({
        userID : userId
    })
});


app.post("/logout" ,(req,res )=>{
    res.clearCookie('token')

    res.send("congratulation , you have been successfully logged outz")
})