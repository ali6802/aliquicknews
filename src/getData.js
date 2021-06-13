const api = require('./api.js')

module.exports = async (req,res) => {
   try {
      const news = await api(req.query.section)              
      res.send({success:true, results:news})

   } catch (error) {      
      console.log(error.message)
      res.send({success:false, message:'Unable to establish connection'})
   }
}