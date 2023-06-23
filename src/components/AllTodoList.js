import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import TodoItem from "./TodoItem";
export default function AllTodoList() {
  const [todos, setTodos] = useState([]);
  const [addInput, setAddInput] = useState([]);

  function addTodo() {
    const newTodo = {
      id: uuidv4(),
      title: addInput,
      description: "......",
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setAddInput("");
  }

  function changeIsDone(id) {
    const CheckList = todos.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodos(CheckList);
  }
  const todo = todos.map((item) => {
    return (
      <TodoItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        isDone={item.isDone}
        changeIsDone={changeIsDone}
      />
    );
  });
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ textAlign: "center" }}
        md={{
          Height: "500px",
        }}
        style={{
          minHeight: "300px",
          backgroundColor: "#EEEEEE",
        }}
      >
        <CardContent>
          {/* title of card */}
          <Typography
            textAlign={"center"}
            variant="h2"
            style={{ fontWeight: "bold" }}
            gutterBottom
          >
            مهامي
            <Divider />
          </Typography>
          {/* end title of card */}

          {/* button to move betweent it */}
          <ToggleButtonGroup
            exclusive
            aria-label="Platform"
            style={{
              marginBottom: "10px",
              direction: "ltr",
              background: "#D65A31",
            }}
          >
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="android"
            >
              المنجز
            </ToggleButton>
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="ios"
            >
              غير منجز
            </ToggleButton>
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="web"
            >
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {/* end button to move betweent it */}

          {/* we add todo item here */}
          <div className="card">{todo}</div>
          {/* we add todo item here */}

          {/* add item input */}
          <Grid container spacing={1} style={{ marginTop: "10px" }}>
            <Grid xs={8}>
              <TextField
                value={addInput}
                onChange={(e) => {
                  setAddInput(e.target.value);
                }}
                id="outlined-basic"
                label="عنوان المهمة "
                variant="outlined"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                }}
              />
            </Grid>
            <Grid xs={4}>
              <Button
                onClick={addTodo}
                variant="contained"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  background: "#D65A31",
                }}
              >
                اضافة مهمة
              </Button>
            </Grid>
          </Grid>
          {/* end add item input */}
        </CardContent>
      </Card>
    </Container>
  );
}
