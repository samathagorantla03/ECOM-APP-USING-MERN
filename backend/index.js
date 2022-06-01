var jsonwebtoken =require('jsonwebtoken');
var express =require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser')
var Cors=require('cors')
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
var url = 'mongodb+srv://samathag:0301@cluster0.jys1v.mongodb.net/ecom?retryWrites=true&w=majority'
mongoose.connect(url)
app.get("/",function(req,res)
{
    res.send("connected")
})
var productSchema=new mongoose.Schema(
    {
        name:String,
        price:String,
        seller:String,
        Description:String,
        src:String
    }
)
var loginSchema=new mongoose.Schema(
    {
        username:String,
        pswd:String,
        usertype:String
    }
)
var cartSchema=new mongoose.Schema({
    name: String,
    price: String,
    username: String,
    src: String
})
var Product=mongoose.model('Product',productSchema)
var Login=mongoose.model('User',loginSchema)
var Cart=mongoose.model('Cart',cartSchema)

app.get("/getproductsdata",function(req,res)
{
    Product.find({},function(err,data)
    {
        //console.log("mydata",data);
        if(!err)
        {  // console.log(data)
            res.send(data);
        }
    })
})

app.get("/getcartdata",function(req,res)
{
    Cart.find({},function(err,data)
    {
        //console.log("mydata",data);
        if(!err)
        {  // console.log(data)
            res.send(data);
        }
    })
})

app.get("/getlogindata",function(req,res)
{
    Login.find({},function(err,data)
    {
        //console.log("mydata",data);
        if(!err)
        {  // console.log(data)
            res.send(data);
        }
    })
})

app.get('/checkAuth', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Token is valid.',
                });
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'No token provided.',
        });
    }
});

app.post("/authenticate",(req, res) => {
    console.log("req",req.body);
    Login.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                success: true,
                message: 'Error',
            });
        } else if (!user) {
            res.json({
                success: true,
                message: 'User not found',
            });
        } else if (user.pswd != req.body.pswd) {
            res.json({
                success: true,
                message: 'Password is incorrect',
            });
        } else {
            var token = jsonwebtoken.sign(
                {
                    username: user.username,
                },
                'secret',
                { expiresIn: '1h' }
            );
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
            });
        }
    });
});

app.post("/adduser", function (req, res) {
    console.log("adduser backend");
    var newUser = new Login({
      username: req.body.username,
      pswd: req.body.pswd,
      usertype: req.body.usertype,
    });
    newUser.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });

app.post("/addproduct", function (req, res) {
    //console.log("adduser backend");
    var newproduct = new Product({
      name: req.body.name,
      price: req.body.price,
      seller: req.body.seller,
      Description: req.body.Description,
      src: req.body.src,
    });
    newproduct.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });
app.post("/addtocart", function (req, res) {
    //console.log("adduser backend");
    var newitem = new Cart({
      name: req.body.name,
      price: req.body.price,
      username: req.body.username,
      src:req.body.src
     
    });
    newitem.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });
  app.delete("/delitem/:id", function (req, res) {
    Cart.findByIdAndDelete(req.params.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });
  var port = 8080 || process.env.PORT
app.listen(port,function(){console.log("server running on the port 8080")})