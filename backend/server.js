//Using Express
const express = require("express");
const mongoose = require("mongoose");
const TODOS = require("./scemas/todo");

// Cresting instance of express
const app = express();
app.use(express.json());
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

  
// Creating post method to create new todoitem
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  //   const newTodo = {
  //     id: todos.length + 1,
  //     title,
  //     description,
  //   };
  //   todos.push(newTodo);
  //   console.log(todos);
  try {
    const newtodo = new TODOS({ title, description });
    await newtodo.save();
    res.status(201).json(newtodo);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
});

// get all the todo list from db
app.get("/todos", async (req, res) => {
  try {
    const alltodos = await TODOS.find();
    res.json(alltodos);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
});

// updating exesting list based on id
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await TODOS.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.json({ message: message.error });
  }
});

// deleting the list

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await TODOS.findByIdAndDelete(id);
    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.json({ message: message.error });
  }
});

// Starting server program
const port = 8000;

app.listen(port, () => {
  console.log("Server listning to port: " + port);
});
