const express = require('express');
const app = express();

app.use(express.json());


const movies = [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
];

app.get('/', (req, res) => {
    
    res.send(movies);

});

app.get('/api/movies/:id', (req,res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) res.status(404).send('No movie found');
    else res.send(movie);
});

app.get('/api/movies/name/:name', (req, res) => {
    const movie = movies.find(c => c.name === req.params.name);
    if (!movie) res.status(404).send('No movie found');
    else res.send(movie);
})

app.post('/api/movies', (req,res)=>{
    const movie = {
        id : movies.length + 1,
        name :  req.body.name,
    };
    movies.push(movie);
    res.send(movie);
});


// PORT
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on Port ${port}`));