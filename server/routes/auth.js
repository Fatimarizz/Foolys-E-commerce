const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Cart = require('../models/cartModel')
// const product = require('../models/productModel')
const authenticate = require('../middleware/authenticate')
const cart = require('../models/cartModel')
//Middlewares
router.get('/', (req, res) => {
    res.send('hello world')
})

//for pasword authentication we use=> npm i bcryptjs
//for user login authentication we use jwt => npm install jsonwebtoken
//for cookie storage we user => npm i cookie-parser
//jwt token help to autherize page that is private can only access by user which login that time 


//Sign up route
router.post('/signup', async (req, res) => {
    console.log(req.body);

    const { name,
        email,
        password,
        confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password) {
        return res.status(500).json({ error: "All fields are required" })
    }
    try {
        const userexist = await User.findOne({ email: email })
        if (userexist) {
            return res.status(500).json({ error: " Email already exist" })
        }
        else if (password != confirm_password) {
            return res.status(500).json({ error: "Pasword doesnt match" })
        }
        else {
            const user = new User({ name, email, password, confirm_password });
            //pasword ko hash kry using bryptjs
            //save sy phely pre method 
            //save ky baad post method

            const saved = await user.save();
            res.status(200).json({ message: " user registerd successfully" })
        }

    } catch (err) {
        console.log(err);
    }

});

//Login Route
router.post('/login', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body

        if (!email || !password) {// fields cant be empty
            return res.status(500).json({ error: "All fields are required" })
        }

        const login = await User.findOne({ email: email });//if doesnot match 
        // console.log(login);
        //login ky pas pora email and pass h 
        if (login) {
            const ismatch = await bcrypt.compare(password, login.password) //compare krna user login ka pass and orginal

            //JWT tockenization in userMOdel
            token = await login.generateAuthToken();
            console.log("token=", token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),//after 30 days expires
                httpOnly: false,

            }, console.log('token is stored in cookie'))
            if (!ismatch) {
                res.status(500).json({ message: "Invalid crediential " })
            }

            else {
                res.json({ message: "user login successfully" })
            }
        }
        else {
            res.status(500).json({ message: "Invalid credientials " })
        }

    }
    catch (err) {
        console.log(err)

    }
});
//logout route
router.get('/logout',(req,res)=>{
    console.log("logout page");
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send("user logout")
})


//product route
router.post('/product', (req, res) => {
    console.log(req.body);

    const product = new Product({

        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        img: req.body.img

    });
    product.save()
        .then(result => {
            console.log(result)
            res.status(200).json({ msg: "sucesssfully product added" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "errro occured in product add" })
        })


})
//get prodyc=
router.get('/product', async (req, res) => {
    const limit = req.headers['limit'];
    const offset = req.headers['currentpage'];
    try {
        // const res = await product.find().skip(5).limit(10);
        const ress = await Product.find().sort({ created_at: -1 }).skip(offset).limit(limit)
        res.status(200).send(ress);
        console.log(res, "resposne ");
    }
    catch (error) {
        console.log(error, "error paginate");
    }
})

router.get('/product/:id', (req, res) => {

    const __id = req.params.id;

    Product.findById(__id) //display by id

        .then(result => {
            console.log(result)
            res.status(200).send(result)

        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})
//cart route save data 
router.post('/cart', async (req, res) => {
    console.log("req body", req.body);
    

    try {
        const exist = await Cart.findOne({ title: req.body.title })
        console.log(exist, "found");
        if (exist) {
            throw new Error({ msg: "Product Exists" });
        }
        else {
            const cart = new Cart({

                title: req.body.title,
                price: req.body.price,
                img: req.body.img,
                quantity: req.body.quantity

            });
            const result = await cart.save();
            if (result){
                console.log(result)
             res.status(200).json({ msg: "sucesssfully added to cart" })
            }else{
                console.log("error looged");
               throw new Error({ msg: "err occured in cart add" })
            }

           
        }
    } catch (error) {
        console.log(error, "error catch block");
        res.status(400).send({ msg: "product exists" });
    }

})
//cart route delete
//delete
router.delete('/cart/:id', (req, res) => {
    const id = req.params.id;
    Cart.remove({ _id: id }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send("error occured")
        }
        else {
            res.status(200).json({ msg: "successfully deleted from cart" })
        }
    })
})
//cart route authentication
router.get('/cart', authenticate, (req, res) => {
    // res.send(req.rootuser)
    Cart.find() //display all
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).send(result)

        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })

})

module.exports = router;