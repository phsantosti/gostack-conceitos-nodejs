const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;
    const likes = 0;

    if(title === undefined || title === ""){
        return response.status(400).json({
            error: "Enter the title of the repository."
        });
    }

    if(url === undefined || url === ""){
        return response.status(400).json({
           error: "Enter the url of the repository."
        });
    }

    if(techs === undefined || techs.length <= 0){
        return response.status(400).json({
            error: "Select one or more technologies."
        })
    }

    const repository = {
        id: uuid(),
        title: title,
        url: url,
        techs: techs,
        likes: likes
    }

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;