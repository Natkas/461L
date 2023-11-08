const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const JWT_SECRET = "hdmFJblkEtQH5okI6MTY5ODYwMjk3MSwiaWF0Ij3lFteQ2mAeyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtSI6IkpM"

const mongoUrl = "mongodb+srv://project_second:project_second123@cluster0.ishovx4.mongodb.net/?retryWrites=true&w=majority";




mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log("Mongodb connected");
}).catch((err) => {
    console.log(err);
})

require('./userDetails');
const User = mongoose.model('UserInfo');


app.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;

    const encryptedPassword = await bcrypt.hash(pass, 10);

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        await User.create({ name, email, encryptedPassword});
            return res.send({status: 'User registered'})
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
})


app.post("/login-user", async (req, res) => {
    const { name, email, pass } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (await bcrypt.compare(pass, user.pass)){
        const token = jwt.sign({}, JWT_SECRET);
        if(res.status(201)){
            return res.json({status: 'User logged in', data: token})
        } else {
            res.send({status: 'Error', error: 'Invalid password'});
        }
    }
})


app.post("/projects", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);

        const useremail = user.email;


        User.findOne({ email: useremail }).then((data) => {
            res.send({status: 'User logged in', data: data});
        }).catch((err) => {
            console.log({status: 'error', data: data} );
        });

    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }

})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})