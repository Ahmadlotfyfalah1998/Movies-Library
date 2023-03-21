'use strict'
const express=require('express')
//const data=require('./data.json')
const app = express()
const cors =require('cors')
const axios = require('axios')
require('dotenv').config()
//const { default: axios } = require('axios')
const PORT =process.env.PORT
const apiKey = process.env.API
app.use(cors())

app.get('/trending',trendingHandeler)
app.get('/search',searchHandeler)
app.get('/certification',certificationsHandeler)
app.get('/movie',changesHandeler)
function trendingHandeler(req,res){
let url =`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
axios.get(url)
.then(result =>{
   console.log(result.data.results);
  let trend= result.data.results.map((movie)=>{
   return new Movies(movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview)
  })
  res.json(trend);
})
.catch(err=>{
   console.log(err);
})
}



function searchHandeler(req,res){
let movieName=req.query.name
console.log(movieName)
 let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&include_adult=false`
axios.get(url)
.then((result)=>{
  // console.log(result.data.results)
   let movieQuery =result.data.results
   res.json(movieQuery)
})
.catch((err)=>{
   console.log(err)
})
}

function certificationsHandeler (req,res){
let url = `https://api.themoviedb.org/3/certification/movie/list?api_key=${apiKey}`

axios.get(url)
.then((result)=>{
  console.log(result.data.certifications)
   
   res.json(result.data.certifications)
})
.catch((err)=>{
   console.log(err)
})




}



function changesHandeler (req,res){
   let url = `https://api.themoviedb.org/3/movie/changes?api_key=${apiKey}&page=1`
   
   axios.get(url)
   .then((result)=>{
     console.log(result.data.results)
      
      res.json(result.data.results)
   })
   .catch((err)=>{
      console.log(err)
   })
   
   
   
   
   }



function Movies(id,title,release_date,poster_path,overview){
this.id = id
this.title=title
this.release_date=release_date
this.poster_path=poster_path
this.overview=overview
}
app.listen(PORT, ()=>{
console.log(`hi ${PORT}`)

})













// app.get('/',homePageHandeler)
//  function homePageHandeler(req,res){
//     let arr=[]
//     let newData=new JsonData(data.title,data.poster_path,data.overview)
//     arr.push(newData)
//  res.send(arr)

//  }

//  app.get('/favorite',favoritePageHandeler)
//  function favoritePageHandeler(req,res){
// res.send("Welcome to Favorite Page")

//  }

//  function JsonData(title,poster_path,overview){
//  this.title=title
//  this.poster_path=poster_path
//  this.overview=overview

//  }