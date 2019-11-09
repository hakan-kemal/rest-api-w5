const Sequelize = require("sequelize");
const db = new Sequelize("postgres://postgres:secret@localhost:5432/postgres", {
  logging: false
});

const Movie = db.define(
  "movie",
  {
    // movieId: {
    //     type: Sequelize.INTEGER,
    //     field: "ID"
    //   },
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

db.sync()
  .then(() => console.log("Tables created successfully"))
  // .then(() => {

  // });
  .catch(err => {
    console.error("Unable to create tables, error:", err);
    process.exit(1);
  });
