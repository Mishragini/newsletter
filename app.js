//jshinit esversion: 6
const https=require("https");
const express = require("express");
//const bodyParser = require("body-parser");
const request = require("request");

const app =express();


app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url='https://us17.api.mailchimp.com/3.0/lists/3801e2b240' ;
    
    const options ={
        method:"POST",
        auth:"mishragini:6452933a2a96ae4814cb4bde7e1dbddf-us17"
    }

   const request= https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");

        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

  // request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running.");
});
// Api key:cf83e9e5d0ef3cbc5a99c0157b182c95-us17
//list id :3801e2b240
