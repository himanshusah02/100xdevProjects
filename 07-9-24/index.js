const express = require('express');

const app = express();
app.use(express.json());

let users = [];

function generateToken(){
    return Math.floor(Math.random())
}


app.post("/signin", function(req,res){
   const username = req.body.username;
   const password = req.body.password;
//    if(username.find(u => u.username === username){
//     user
//    })

   users.push({
    username:username,
    password:password,
   })
 req.json({
    message :"you are singned in"
 })

})

app.post("/signin", function(req,res){
  
  
})

app.get("/me", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
   
    let founduser = Null;
    for(let i=0; i<users.length;i++){
       if(users[i].username == username && users[i].password){
        founduser = users[i]
       } 
    }
    if(founduser){
        const token = generateToken();
        founduser.token = token;
        res.json({
            token:token
        })
    }
    else{
        res.status(403).send({
            message:"some thing went wrong"
        })
    }

})

app.listen(4000);
