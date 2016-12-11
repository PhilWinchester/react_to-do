const pg = require('pg-promise')({/* OPTIONAL Initialization Options */});

const config = {
  host:       process.env.DB_HOST,
  port:       process.env.DB_PORT,
  database:   process.env.DB_NAME,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
};

const db = pg(config);

module.exports = {

  /* GET /tasks */
  getTasks(req, res, next) {
    db.any('SELECT * from task;')
      .then((tasks) => {
        res.rows = tasks;
        next();
      })
      .catch(error => next(error));
  },

  /* POST /tasks */
  /* creates a new task, returns the newly created record */
  addTask(req, res, next) {
    console.log('===addTask===',req.body);
    db.one(
      'INSERT INTO task (name, description) VALUES ($/name/, $/desc/) returning *;',
      req.body
      )
      .then((task) => {
        console.log('ADDED TASK SUCCESSFUL');
        res.rows = task;
        next();
      })
      .catch(error => next(error));
  },
  getALife(req,res,next) {
    console.log('who makes their own to do list??');
    console.log('who stalks people on github??');
    db.none(`
      SELECT the_point FROM life
      WHERE name = $1;
    `, ['Jason Seminara'])
    .then(life => {
      console.log('why am i doing this')
      res.pointless = life;
      next()
    })
    .catch(life => next(who_cares)); //also removed ur comments b/c those things are pointless
  },
}
