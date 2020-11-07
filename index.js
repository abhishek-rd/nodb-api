const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());

app.use(logger);


const movies = [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
];

//READ
app.get('/', (req, res) => {
    
    res.send(movies);

});

app.get('/api/movies/:id', (req,res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('No movie found');
    else res.send(movie);
});

app.get('/api/movies/name/:name', (req, res) => {
    const movie = movies.find(c => c.name === req.params.name);
    if (!movie) res.status(404).send('No movie found');
    else res.send(movie);
})

//CREATE
app.post('/api/movies', (req,res)=>{

    const {error} = validateMovie(req.body);

    if (error) return res.status(400).send(error.details[0]['message']);

    const movie = {
        id : movies.length + 1,
        name :  req.body.name,
    };
    movies.push(movie);
    res.send(movie);
});

/// UPDATE
 app.put('/api/movies/put/:id',(req,res)=>{

    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('No movie found');

    const {error} = validateMovie(req.body);

    if (error) return res.status(400).send(error.details[0]['message']);

    movie.name = req.body.name;
    res.send(movie);

 });

 // DELETE
app.delete('/api/courses/:id',(req,res)=>{

    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('No movie found');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send();

})

function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(movie);
 }




// PORT
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on Port ${port}`));