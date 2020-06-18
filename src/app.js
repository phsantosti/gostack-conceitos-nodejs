const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
 * List repositories by filter or list all repositories
 */
app.get("/repositories", (request, response) => {
    const { title } = request.query;
    const results = (title ? repositories.filter(repository => repository.title.includes(title)) : repositories);
    return response.json(results);
});

/**
 * Create a new repository
 */
app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;
    const likes = 0;

    // if(title === undefined || title === ""){
    //     return response.status(400).json({
    //         error: "Enter the title of the repository."
    //     });
    // }
    //
    // if(url === undefined || url === ""){
    //     return response.status(400).json({
    //        error: "Enter the url of the repository."
    //     });
    // }
    //
    // if(techs === undefined || techs.length <= 0){
    //     return response.status(400).json({
    //         error: "Select one or more technologies."
    //     })
    // }
    //
    // if((repositories.findIndex(repository => repository.title === title)) >= 0){
    //     return response.status(400).json({
    //         error: "There is already a repository with the title provided"
    //     });
    // }
    //
    // if((repositories.findIndex(repository => repository.url === url)) >= 0){
    //     return response.status(400).json({
    //         error: "There is already a repository with the url provided"
    //     });
    // }

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

/**
 * Update a specific repository by id
 */
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
      return response.status(400).json({
         error: "Repository not found"
      });
  }

  if(likes > 0){
      return response.status(400).json({
          error: "Incorret enter param likes",
          likes: 0
      });
  }

  const repository = {
      id: id,
      title: title,
      url: url,
      techs: techs,
      likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

/**
 * Delete a specific reposi
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log(repositoryIndex);

  if(repositoryIndex < 0){
      return response.status(400).json({
          error: 'Repository not found.'
      });
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0){
        return response.status(400).json({
            error: "Repository not found"
        });
    }

    const repository = {
        id: id,
        title: repositories[repositoryIndex].title,
        url: repositories[repositoryIndex].url,
        techs: repositories[repositoryIndex].techs,
        likes: (repositories[repositoryIndex].likes += 1)
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
});

module.exports = app;