import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";

import { Todos } from "../context/Todos";

export default function TodoItem({ todo, openDeleteBox, openEditBox, notify }) {
  const { todos, setTodos } = useContext(Todos);
  function handleDeleteClick() {
    openDeleteBox(todo);
  }

  function handleUpdateClick() {
    openEditBox(todo);
    console.log(todo);
  }
  function changeIsDone() {
    // FUNCTION TO DONE TODO
    const CheckList = todos.map((item) => {
      if (item.id === todo.id) {
        item.isDone = !item.isDone;
        if (item.isDone) {
          notify("🥳تهانينا انجزت المهمة");
        }
      }
      return item;
    });
    setTodos(CheckList);
    localStorage.setItem("todos", JSON.stringify(CheckList));
  }

  return (
    <Card
      sx={{
        minHeight: "100px",
        marginBottom: 2,
      }}
      style={{
        background: todo.isDone ? "#2E8A99" : "#0E2954",
        transition: "all 0.2s linear",
        borderBottom: "3px solid #00ADB5",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            sm={8}
            textAlign="right"
            style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          >
            <span
              style={{ color: "#fff", fontSize: "12px", fontWeight: "lighter" }}
            >
              {todo.date}
            </span>

            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                textDecoration: todo.isDone ? "line-through" : "none",
                color: "#fff",
              }}
            >
              {todo.title}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontWeight: "lighter",
                color: "#fff",
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
            >
              {todo.description}
            </Typography>
          </Grid>

          <Grid
            sm={4}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #82CD47 2px",
                  color: "#82CD47",
                  background: todo.isDone ? "#fff" : "transparent",
                }}
                onClick={changeIsDone}
              >
                <CheckIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #6FEDD6 2px",
                  color: "#6FEDD6",
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon sx={{ fontSize: 15 }} />
              </IconButton>

              <IconButton
                className="iconButton"
                style={{
                  border: "solid #F65A83 2px",
                  color: "#F65A83",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteForeverIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
