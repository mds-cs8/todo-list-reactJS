import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Todos } from "../context/Todos";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoItem({ id, title, description, date, isDone }) {
  const { todos, setTodos } = useContext(Todos);
  const [editTodo, setEditTodo] = useState({
    title: title,
    description: description,
  });

  function changeIsDone() {
    // FUNCTION TO DONE TODO
    const CheckList = todos.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodos(CheckList);
    localStorage.setItem("todos", JSON.stringify(CheckList));
  }
  function editTodos() {
    // FUNCTION TO DONE TODO
    const edit = todos.map((item) => {
      if (item.id === id) {
        item.title = editTodo.title;
        item.description = editTodo.description;
      }
      return item;
    });
    setTodos(edit);
    localStorage.setItem("todos", JSON.stringify(edit));

    closeEditModal();
  }

  function deleteTodo() {
    const Delete = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(Delete);
    localStorage.setItem("todos", JSON.stringify(Delete));

    closeDeleteModal();
  }

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const openDeleteModal = () => {
    setOpenDelete(true);
  };
  const openEditModal = () => {
    setOpenEdit(true);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };
  return (
    <Card
      sx={{
        minHeight: "100px",
        marginBottom: 2,
      }}
      style={{
        background: isDone ? "#2E8A99" : "#0E2954",
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
              {date}
            </span>

            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                textDecoration: isDone ? "line-through" : "none",
                color: "#fff",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontWeight: "lighter",
                color: "#fff",
                textDecoration: isDone ? "line-through" : "none",
              }}
            >
              {description}
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
                  background: isDone ? "#fff" : "transparent",
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
                onClick={openEditModal}
              >
                <EditIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <Dialog
                open={openEdit}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeEditModal}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle style={{ fontWeight: "bold", direction: "rtl" }}>
                  {"هل تريد تعديل المهمة ؟"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <TextField
                        id="outlined-basic"
                        label="عنوان المهمة "
                        variant="outlined"
                        style={{
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        value={editTodo.title}
                        onChange={(e) => {
                          setEditTodo({ ...editTodo, title: e.target.value });
                        }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="تفاصيل المهمة "
                        variant="outlined"
                        style={{
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                        value={editTodo.description}
                        onChange={(e) => {
                          setEditTodo({
                            ...editTodo,
                            description: e.target.value,
                          });
                        }}
                      />
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "#0081C9",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={editTodos}
                  >
                    تعديل
                  </Button>
                  <Button
                    style={{
                      background: "#DF2E38",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={closeEditModal}
                  >
                    الغاء
                  </Button>
                </DialogActions>
              </Dialog>
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #F65A83 2px",
                  color: "#F65A83",
                }}
                onClick={openDeleteModal}
              >
                <DeleteForeverIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDeleteModal}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle
                  style={{
                    fontWeight: "bold",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  {"هل تريد حذف المهمة ؟"}
                </DialogTitle>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "#0081C9",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={deleteTodo}
                  >
                    نعم
                  </Button>
                  <Button
                    style={{
                      background: "#DF2E38",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={closeDeleteModal}
                  >
                    لا
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
