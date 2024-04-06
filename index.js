const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port=3000;
const questions = require('./questions.json');
let username="user2024";

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine to use hbs
app.set('view engine', 'hbs');


//routing
app.get('/',async (req,res)=>{
res.render('home');
});

app.post('/home', async (req, res) => {
    username=req.body.username;
    res.render('quiz', { questions: questions });
});

app.post('/submit-quiz', async (req, res) => {
    const userAnswers = req.body;
    let score = 0;

    questions.forEach(question => {
        if (question.answer === userAnswers[question.question]) {
            score++;
        }
    });

    res.render('thankyou', { username:username, score: score, total: questions.length });
});

app.get('/thankyou',async (req,res)=>{
res.render('thankyou');
});


//server hosting
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})