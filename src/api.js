const rp = require('request-promise')
 
module.exports = function (section='home') {
   const api_key = process.env.NYT_API_KEY
   const url = 'https://api.nytimes.com/svc/topstories/v2/'+section+`.json?api-key=${api_key}`
 
   return rp({url, json:true})
   .then(news=>news.results)
   .then(results=>{
      let keys=['title','abstract','section','updated_date','url'];
      return results.map(element=>{
         return keys.reduce((accum,current)=>{
            accum[current]=element[current];
            return accum;
         },{});
      });            
   });   
}


/*
const api_key = process.env.API_KEY  
   const url = 'https://api.spoonacular.com/recipes/random?apiKey='+api_key+`&number=${number}`
 
   return rp({url, json:true})
   .then(body=>body.recipes)
   .then(recipes=>{
      const essentials = recipes.reduce((accum,value)=>{
         const {id,title,image}=value
         accum.push({
            id:id,
            title:title,
            image:image,               
         })
         return accum
      },[])
      return {success:true,results:essentials}
   })
*/