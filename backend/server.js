//Using Express
const express = require("express");
const mongoose = require("mongoose");
const TODOS = require("./schemas/todo");

// Cresting instance of express
const app = express();
app.use(express.json());
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error("DB connection error:", err));

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
    res.status(500).json({ message: error.message });
  }
});

// get all the todo list from db
app.get("/todos", async (req, res) => {
  try {
    const alltodos = await TODOS.find();
    res.json(alltodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(updatedTodo);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// deleting the list

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await TODOS.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Starting server program
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server listening on port", port));
