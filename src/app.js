let express=require('express')
let app=express();
const path=require('path')
const hbs=require('hbs')
const port=process.env.port || 8000;
const weatherData=require("../utils/weatherData");

const publicPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get("/",(req,res)=>{
    res.render("index",{title: "Weather-App ☁"})
})

app.get("/weather",(req,res)=>{
    if (!req.query.address){
        res.send("Address is Required")
    }
    weatherData(req.query.address,(error,result)=>{
        if(error){
            return res.send(error)
        }
        return res.json(result)
    })
})

app.get("*",(req,res)=>{
    res.render("404",{title:"404 - Not Found 😒"})
})
app.listen(port,()=>{
    console.log("Server Started Successfully!!")
})
