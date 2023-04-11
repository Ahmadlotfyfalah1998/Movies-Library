'use strict'
const express=require('express')
//const dataJson =require('./data.json')
const axios = require ('axios')
const cors =require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const { Client } = require('pg')



//const { default: axios } = require('axios')
let url=process.env.URL
const client = new Client(url)
const PORT =process.env.PORT
const app = express()
app.use(cors())







app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const apiKey = process.env.API





app.get('/',homePageHandeler)
app.get('/favorite',favoritePageHandeler)
 app.get('/trending',trendingHandeler)
 app.get('/search',searchHandeler)
 app.get('/certification',certificationsHandeler)
 app.get('/movie',changesHandeler)




app.post('/addMovies',addMoviesHandler)
app.get('/getMovies',getMovirsHandler)
app.put('/updateMovie/:id',updatehandler)
app.delete('/deleteMovie/:id',deleteHandler)
app.get('/getMovie/:id',getMovieByIdHandler)






 function homePageHandeler(req,res){
    ////let arr=[]
    //let newData=new JsonData(data.title,data.poster_path,data.overview)
    //arr.push(newData)
 res.send("home page")

 }


 function favoritePageHandeler(req,res){
res.send("Welcome to Favorite Page")

 }

 function JsonData(title,poster_path,overview){
 this.title=title
 this.poster_path=poster_path
 this.overview=overview

 }








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
.catch()
}





function searchHandeler(req,res){
   let movieName=req.query.name
   console.log(movieName)
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&include_adult=false`
   axios.get(url)
   .then((result)=>{
     console.log(result.data.results)
      let movieQuery =result.data.results
      res.json(movieQuery)
   })
   .catch()
   }
   
   function certificationsHandeler (req,res){
   let url = `https://api.themoviedb.org/3/certification/movie/list?api_key=${apiKey}`
   
   axios.get(url)
   .then((result)=>{
     console.log(result.data.certifications)
      
      res.json(result.data.certifications)
   })
   .catch()
   
   
   
   
   }
   
   
   
   function changesHandeler (req,res){
      let url = `https://api.themoviedb.org/3/movie/changes?api_key=${apiKey}&page=1`
      
      axios.get(url)
      .then((result)=>{
        console.log(result.data.results)
         
         res.json(result.data.results)
      })
      .catch()
      
      
      
      
      }
   
   
   
   function Movies(id,title,release_date,poster_path,overview){
   this.id = id
   this.title=title
   this.release_date=release_date
   this.poster_path=poster_path
   this.overview=overview
   }




function addMoviesHandler(req,res){
console.log(req.body)
let {movie,comment}=req.body;
let sql =`INSERT INTO movies (movie,comment)
VALUES ($1,$2);`
let values =[movie,comment];
client.query(sql,values).then(
res.status(201).json(data.rows)


 ).catch()



}

function getMovirsHandler (req,res){
let sql =`SELECT * FROM movies;`
client.query(sql).then((result)=>{
   res.json(result.rows)
})
.catch()


}


function updatehandler (req,res){
   let id = req.params.id
let {movie,comment}=req.body;
let sql= `UPDATE movies
SET movie=$1, comment = $2
WHERE id=$3 RETURNING *;`
let values = [movie,comment,id]
client.query(sql,values)
.then(result=>{     
console.log(result.rows)
res.json(result.rows)


})
.catch()

}



function deleteHandler (req,res){
   let id = req.params.id
   let sql=`DELETE FROM movies WHERE id=$1 RETURNING *;`
  
  let values =[id]
  
     client.query(sql,values)
     .then((result)=>{
        res.json(result.rows)
        console.log(result.rows)
     })
     .catch()


 }


 function getMovieByIdHandler(req,res){

  let id = req.params.id
 let sql=`SELECT * FROM movies WHERE id=$1`

let values =[id]

   client.query(sql,values)
   .then((result)=>{
      res.json(result.rows)
      console.log(result.rows)
   })
   .catch()
   


 }



client.connect().then(()=>{

   app.listen(PORT, ()=>{
      console.log(`hi ${PORT}`)
      
      }) 

})
.catch()
