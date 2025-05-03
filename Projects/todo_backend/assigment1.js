const express = require("express");

let app = express();
let countRequest = 0;

app.use(function (req,res,next) {
  countRequest = countRequest + 1;
  next();
});


app.get("/user", (req,res)=>{
    console.log(countRequest)
   res.status(200).json({
      "user" : "himanshu sah"
   })
})


app.listen(8080,()=>{
    console.log("server start");
})
