const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log("Database is conected"))
.catch(err => console.log(err));