const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://postgres:secret@localhost:5432/postgres", {
  logging: false
});

const Movie = db.define(
  "movie",
  {
    title: {
      type: Sequelize.STRING,
      field: "Title"
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: "Year of Release"
    },
    synopsis: {
      type: Sequelize.STRING,
      field: "Synopsis"
    }
  },
  {
    timestamps: false,
    tableName: "Movies"
  }
);

db.sync({ force: true })
  .then(() => console.log("Tables created successfully"))
  .then(() =>
    Promise.all([
      Movie.create({
        title: "Joker",
        yearOfRelease: 2019,
        synopsis: `In Gotham City, mentally-troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: "The Joker".`
      }),
      Movie.create({
        title: "El Camino",
        yearOfRelease: 2019,
        synopsis: `A sequel, of sorts, to Breaking Bad following Jesse Pinkman after the events captured in the finale of Breaking Bad. Jesse is now on the run, as a massive police manhunt for him is in operation.`
      }),
      Movie.create({
        title: "Once Upon a Time in Hollywood",
        yearOfRelease: 2019,
        synopsis: `A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.`
      })
    ])
  )
  .catch(err => {
    console.error("Unable to create tables, error:", err);
    process.exit(1);
  });

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.status(200).send(`Sequelize-rest.js connected!`);
});

const port = 4000;

app.listen(port, () => {
  console.log(`Movies API listening on port :${port}`);
});

app.post("/movies", (request, response, next) => {
  const movie = {
    title: request.body.title,
    yearOfRelease: request.body.yearOfRelease,
    synopsis: request.body.synopsis
  };
  Movie.create(movie)
    .then(movie => {
      response.status(200).send(movie);
    })
    .catch(next);
});

app.get("/movies", (request, response, next) => {
  Movie.findAll()
    .then(movies => {
      response.status(200).send(movies);
    })
    .catch(next);
});

app.get("/movies/:movieId", (request, response, next) => {
  Movie.findByPk(request.params.movieId)
    .then(movie => {
      if (movie) {
        response.status(200).send(movie);
      } else {
        response.status(404).end();
      }
    })
    .catch(next);
});

app.put("/movies/:movieId", (request, response, next) => {
  Movie.findByPk(request.params.movieId)
    .then(movie => {
      if (movie) {
        movie
          .update(request.body)
          .then(movie => response.status(200).send(movie));
      } else {
        response.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/movies/:movieId", (request, response, next) => {
  Movie.destroy({ where: { id: request.params.movieId } })
    .then(deleted => {
      const message = { message: "A movie was deleted!" };
      if (deleted) {
        return response.json(message).status(204);
      } else {
        return response.status(404).end();
      }
    })
    .catch(next);
});
