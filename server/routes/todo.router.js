const express = require("express");
const router = express.Router();

// DataBase CONNECTION
const pool = require("../modules/pool.js");

// GET
router.get("/", (req, res) => {
  let queryText = `
    SELECT * FROM "todo";
  `;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting tasks", error);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  
  console.log(req.body);
  const newTask = req.body;
  // send body data to db
  //prepared statement
  const queryText = `
    INSERT INTO "todo" ("task")
    VALUES ($1);
  `;
  // $1 is placeholder
  // go get first thing from array
  pool
    .query(queryText, [newTask.task])
    .then((result) => {
      console.log(result);
      
      res.sendStatus(201);
    })
    .catch((error) => {
      //even when things go wrong, send a response to client
      console.log(error);
      res.sendStatus(500);
    });
}); // end POST

// DELETE
router.delete("/:id", (req, res) => {
  // target id of thing being deleted
  let id = req.params.id;
  console.log("Delete route called with id of: ", id);

  // sql to delete item from database
  const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

  // sending sql code to postico
  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
}); // end DELETE

// PUT
router.put("/:id", (req, res) => {
  // id of todo to change status
  const id = req.params.id;
  // changed status info from client
  const completeStatus = req.body.complete;

  // query to SQL
  const queryText = `
    UPDATE "todo" SET "complete" = $1 WHERE "id" = $2;
  `;

  pool
    .query(queryText, [completeStatus, id])
    .then((result) => {
      console.log(result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
