const express = require('express')
require('dotenv').config()
const getData = require('./getData')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{   
   const indexPath = path.join(__dirname,'../public/index.html')
   res.sendFile(indexPath)
})

app.get('/api',getData)

app.listen(port,()=>{
   console.log('App is listening on port '+port)
})