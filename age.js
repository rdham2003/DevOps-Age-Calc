const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); 

app.post('/getAge', (req, res) => {
    const { month, day, year, unit } = req.body;
    
    var birthDate = new Date(`${year}-${month}-${day}`);
    var currentDate = new Date();
    console.log(birthDate);
    console.log(currentDate);
    console.log(unit);
    var age = currentDate - birthDate;
    switch(unit){
        case 'years':
            age = age / 31536000000;
            break;
        case 'months':
            age = age / 2592000000;
            break;
        case 'days':
            age = age / 86400000;
            break;
        case 'hours': 
            age = age / 3600000;
            break;
        case 'minutes': 
            age = age / 60000;
            break;
        case 'seconds':
            age = age / 1000;
            break;
    }
    console.log(age);
    res.json({age});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})