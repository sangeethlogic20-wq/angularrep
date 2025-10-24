var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
var users = { 10 : { "name":"kiran", phoneno : 98353426},
              11 : { "name":"swapna", phoneno : 99353429},
              12 : { "name":"tony", phoneno : 56555555},
              14 : { "name":"shafna", phoneno : 789534528},
              15 : { "name":"reena", phoneno : 9449534528},
              16 : { "name":"amal", phoneno : 84534528}
            }
/*app.use(cors({
        origin: 'http://localhost:4200' // Allow requests from your Angular app
    }));*/

app.use(cors()); 
app.use(bodyParser.urlencoded({extended:true}));   

app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })) //Allso for the url encoded

// This responds with "Get" on the homepage
app.get('/', function (req, res) 
{
   console.log("Got a GET request for the homepage");
   res.send(users);
})
// This responds a POST request 
app.post('/post_user', function (req, res) 
{
   console.log("Got POST request from ", req.body.name," with id ", req.body.id);
   users[req.body.id] = { "name": req.body.name, "phoneno" :  req.body.phoneno};
   console.log("New User added is ", users[req.body.id]);
   res.send(users[req.body.id]);
  // res.send("Name returned is " + req.body.name + " and Phoneno is " + req.body.phoneno);
})

// This responds a PUT request
app.put('/put_user/:id', function (req, res) 
{
   console.log("Got PUT request from ", req.body.name," with id ", req.body.id);
   var current_id = req.params.id;
   var current_user = users[current_id];
  
   if(current_user !== undefined)
   {
      current_user.name = req.body.name;
      current_user.phoneno = req.body.phoneno;
      console.log("Current User updated is ", current_user);
      res.send(current_user);
      //res.send("Name updated is "+ current_user.name +" and new Phoneno is "+ current_user.phoneno);
   }
   else
   {
       let errorresp = '{"name": "Updation Failed"}';
       res.send(JSON.parse(errorresp));
      //res.send("User doesnt exist");
   }
})

// This responds a DELETE request
app.delete('/delete_user/:id', function (req, res) 
{
   console.log("Got DELETE request from user with id ", req.params.id);
   let current_id = req.params.id;
   let current_user = users[current_id];
   if(current_user !== undefined)
   {
      delete users[current_id];
      console.log("The User deleted is ", current_user);
      res.send(current_user);
     // res.send("User deleted is "+ current_user.name);
   }
   else
   {
       let errorresp = '{"name": "Deletion Failed"}';
       res.send(JSON.parse(errorresp));
       // res.send("User doesnt exist");
   }
})

// This responds a GET request for the /show_user page with querystring values
app.get('/show_user', function (req, res) 
{
   console.log("Got a GET request for show_user with name", req.query.name);
   let user_name = req.query.name;
   for(var userid in users)
   {
     if(users[userid].name == user_name)
     {
      return res.send('User with Name ' + user_name + ' found');
     }
   }
   res.send('Users with Name ' + user_name + ' not found');
})

// This responds a GET request for the /list_user page with parameters.
app.get('/list_user/:id', cors(),  function (req, res) 
{
   console.log("Got a GET request for list_user with id", req.params.id);
   let current_id = req.params.id;
   let current_user = users[current_id];
   if(current_user !== undefined)
   {
   res.send(current_user);
   //res.send('User Name with ID ' + req.params.id + ' is ' + current_user.name +
   //' and User Phoneno is ' + current_user.phoneno);
   }
   else
   {
      //res.send('User with ID ' + current_id + ' not found');
      let errorresp = '{"name": "Not Found"}';

      res.send(JSON.parse(errorresp));
   }
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/a*z', function(req, res) 
{   
   console.log("Got a GET request for /a*z");
   res.send('Page Pattern Match');
})

var server = app.listen(8082,"127.0.0.1", function () 
{
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s - %s", host, port)
})