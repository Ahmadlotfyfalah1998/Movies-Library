'use strict'
const express=require('express')
const data=require('./data.json')
const app = express()
const port =3004

app.get('/',homePageHandeler)
 function homePageHandeler(req,res){
    let arr=[]
    let newData=new JsonData(data.title,data.poster_path,data.overview)
    arr.push(newData)
 res.send(arr)

 }

 app.get('/favorite',favoritePageHandeler)
 function favoritePageHandeler(req,res){
res.send("Welcome to Favorite Page")

 }

 function JsonData(title,poster_path,overview){
 this.title=title
 this.poster_path=poster_path
 this.overview=overview

 }


app.listen(port, ()=>{
console.log(`hi ${port}`)

})