const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongodb = require('mongodb')


const User = require("../modal/userSchema");
const Cat = require("../modal/catSchema");

router.get('/', (req, res) => {
    res.send('server start from router file')
});

// router.post('/register', (req, res)=>{

//     const {name, email, password, role} = req.body;


//     if(!name || !email || !password || !role){
//         return res.status(422).json({error:"error, enter all fields"})
//     }

//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"email already exist"})
//         }

//         const user = new User({name, email, password, role});

//         user.save().then(()=>{
//              res.status(422).json({message:"saved succesfully"})
//         }).catch((err)=>res.status(500).json({error:"failed register"}))
//     }).catch(err=>{console.log(err);});

// })
router.post('/register', async (req, res) => {

    const { id, name, email, password, role } = req.body;

    if(id){

    } else{

    
    if (!name || !email || !password || !role) {
        return res.status(422).json({ error: "error, enter all fields" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        } else {
            const user = new User({ name, email, password, role });
            // hashing password

            await user.save();

            res.status(201).json({ message: "user register succesfully" })

        }

    } catch (err) {
        console.log(err)
    }
}

});



router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "error, enter all fields" })
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            const token = await userLogin.generateAuthToken();
            console.log(token)

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });

            if (userLogin.password == password) {
                res.status(200).json({ message: "user login succesfully" })
            } else {
                res.status(400).json({ error: "wrong password" })
            }
        } else {
            res.status(400).json({ error: "wrong email" })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/addcat', async (req, res) => {

    const { name, weight, age } = req.body;

    if (!name || !weight || !age) {
        return res.status(422).json({ error: "error, enter all fields" })
    }

    try {

        const cat = new Cat({ name, weight, age });

        await cat.save();

        res.status(201).json({ message: "cat saved succesfully" })

    } catch (err) {
        console.log(err)
    }
});

router.get('/getcat', async (req, res)=>{
    const data = await Cat.find();
    res.send(data);
})

router.get('/getusers', async (req, res)=>{
    const data = await User.find();
    res.send(data);
})

router.delete('/:id', async(req, res)=>{
    const result = await User.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.send(result);
})

router.delete('/cat/:id', async(req, res)=>{
    const result = await Cat.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.send(result);
})

router.put('/edit', async (req, res)=>{

    const {id, nameEdit, weightEdit, ageEdit} = req.body;
    console.log(id, nameEdit, weightEdit,ageEdit);
    const result = await Cat.updateOne(
        {_id:id},
        {$set:{name:nameEdit, weight: weightEdit, age:ageEdit}
        }
    )
    console.log(result)
    
    res.status(201).json({ message: result })
})



module.exports = router;