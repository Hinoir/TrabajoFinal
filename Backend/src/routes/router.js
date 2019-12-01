const { Router } = require('express');
const router = Router();

const User = require('../models/user');

router.get('/',(req,res) => res.send('Hello world'));

//Registrar usuarios
router.post('/register', async (req,res)=>{
    const {name,username,identification,password,photo,active} = req.body;
    const newUser = new User({name,username,identification,password,photo,active});
    await newUser.save();
    res.send('register');
});

//Listar usuarios
router.get('/users', async (req,res) => {
    const users = await User.find();
    res.json(users);
});

//Obtener una sola tarea
router.get('/users/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

//Actualizar los datos de los usuarios
router.put('/update/:id',async (req,res) => {
    const {name,username,identification,password,photo,active} = req.body;
    const newUser = new User({name,username,identification,password,photo,active});
    await User.findByIdAndUpdate(req.params.id,newUser);
    res.json({status: "User updated" });
});

//Borrar usuarios
router.delete('/delete/:id', async (req,res)=>{
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User remove'});
});

module.exports = router;