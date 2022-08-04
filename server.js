const express = require('express')
const dbConnect = require('./dbConnect')
const itemsRoute = require('./routes/itemsRoute') 
const userRoute = require('./routes/userRoute')
const billsRoute = require('./routes/billsRoute') 
const path = require('path')
require("dotenv").config();


const app = express()
app.use(express.json())


const port = process.env.PORT || 5000


app.use('/api/items/', itemsRoute)
app.use('/api/user/', userRoute)
app.use('/api/bills', billsRoute)

if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req,res)=>{
         res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    }) 
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})