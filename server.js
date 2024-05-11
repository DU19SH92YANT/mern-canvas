const express = require('express')
const dotenv = require("dotenv")
const app = express()
const cors = require('cors')
const {  mongoose } = require('mongoose')
const path = require('path')
dotenv.config()
if(process.env.NODE_ENV === "local"){
    app.use(cors({
        origin:"https://localhost:3000",
        credentials: true
    }))
}else{
    app.use(cors({
        
        credentials: true
    }))
}

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , './frontend/dist')))
    app.get("*",(req , res)=>{
        res.sendFile(path.resolve(__dirname, './', 'frontend','dist','index.html'))
    })
}

const dbConnect = async ()=>{
try {
    if(process.env.NODE_ENV === "local"){
        await mongoose.connect(process.env.LOCAL_DB_URI)
    }else{
        await mongoose.connect(process.env.MONGODB_URI)
    }
} catch (error) {
    
}
}

dbConnect()



const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))