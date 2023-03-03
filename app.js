const express=require('express');
const app= express(); 
const bodyParser= require('body-parser');  
const request= require('request'); 

const mailchimp= require('@mailchimp/mailchimp_marketing');

app.use(bodyParser.urlencoded({extended: true}));  

// Server to serve the static file Such as css, images, js below we used special function of express "static" 
// public is static folder which contains the files which server needs
  app.use(express.static("public"));

app.get("/", function(req, res){
 res.sendFile(__dirname+"/signUp.html");
}); 

mailchimp.setConfig({
    apiKey: "63885e0fb4ae950b4aa27fbaed6da601-us21",
    server: "us21",
  }); 


 
app.post("/",function(req, res){
    const firstName= req.body.firstName; 
    const lastName= req.body.lastName;
    const email= req.body.email;
    const listId="e260cc6b7b";
     
  const statusCode= res.statusCode; 
  if(statusCode === 200){
    res.sendFile(__dirname+"/sucessful.html");
  } else {
    res.sendFile(__dirname+"/failure.html");
  }
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
 
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
 
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }
 
  run();
}); 

app.post("/failure", function(req, res){
    res.redirect('/'); // it Redirect to signUp page thats the Home page.
})

// we are hosting our web app on www using heroku hosting platform.
app.listen(process.env.PORT ||3000, function(){  // process.env.PORT aloows to add dynamic port that heroku will difine
    console.log("server Listening at 3000");
}) 


// 63885e0fb4ae950b4aa27fbaed6da601-us21 

// Auidance ID  e260cc6b7b