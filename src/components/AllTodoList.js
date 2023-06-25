import { useState } from "react";
import * as React from "react";
import { useContext } from "react";
import { useEffect } from "react";

// MUI LIBRARY
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
// END MUI LIBRARY

// LIBRARY TO SET RANDON ID
import { v4 as uuidv4 } from "uuid";
// END LIBRARY TO SET RANDON ID

// COMPONENT & Context
import TodoItem from "./TodoItem";
import { Todos } from "../context/Todos";
// END COMPONENT

export default function AllTodoList() {
  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 6,
  };
  // END MODAL STYLE

  const { todos, setTodos } = useContext(Todos);
  const [open, setOpen] = React.useState(false); // STATE TO OPEN OR CLOSE MODAL
  const handleOpen = () => setOpen(true); // FUNCTION TO OPEN MODAL
  const handleClose = () => setOpen(false); // FUNCTION TO CLOSE MODAL
  //----------------------------------------------------------------------------

  const [addInput, setAddInput] = useState({ title: "", description: "" });
  const [displayTodo, setDisplayTodo] = useState("all");

  function addTodo() {
    // FUNCTION TO ADD NEW TODO
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let allDate = `${date} : ${month} : ${year}`;
    const newTodo = {
      id: uuidv4(),
      date: allDate,
      title: addInput.title,
      description: addInput.description,
      isDone: false,
    };
    const update = [...todos, newTodo];
    setTodos(update);
    localStorage.setItem("todos", JSON.stringify(update));
    setAddInput({ title: "", description: "" });
    handleClose();
  }

  const doneTodo = todos.filter((item) => {
    return item.isDone;
  });
  const notDoneTodo = todos.filter((item) => {
    return !item.isDone;
  });

  let showTodo = todos;
  if (displayTodo === "done") {
    showTodo = doneTodo;
  } else if (displayTodo === "not-done") {
    showTodo = notDoneTodo;
  }

  const show = showTodo.map((item) => {
    // CREATE TODO
    return (
      <TodoItem
        key={item.id}
        date={item.date}
        id={item.id}
        title={item.title}
        description={item.description}
        isDone={item.isDone}
      />
    );
  });

  useEffect(() => {
    const valueInLocalStorage = JSON.parse(localStorage.getItem("todos"));
    return setTodos(valueInLocalStorage);
  }, [todos]);
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
          {/*-----------------------------/}

          {/* button to move betweent it */}
          <ToggleButtonGroup
            value={displayTodo}
            onChange={(e) => {
              setDisplayTodo(e.target.value);
            }}
            exclusive
            aria-label="Platform"
            style={{
              marginBottom: "10px",
              direction: "ltr",
              background: "#2E8A99",
            }}
          >
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="done"
              onChange={(e) => {
                setDisplayTodo(e.target.value);
              }}
            >
              المنجز
            </ToggleButton>
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="not-done"
              onChange={(e) => {
                setDisplayTodo(e.target.value);
              }}
            >
              غير منجز
            </ToggleButton>
            <ToggleButton
              style={{ fontWeight: "bold", color: "#fff" }}
              value="all"
              onChange={(e) => {
                setDisplayTodo(e.target.value);
              }}
            >
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {/*----------------------------------------------/}

          {/* we add todo item here */}
          <div className="card">{show}</div>
          {/*-----------------------------/}

          {/* add item input */}
          <Grid
            container
            spacing={1}
            style={{ marginTop: "10px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* ADD TODO BUTTON CLICK IT TO OPEN MODAL */}
            <Grid xs={5}>
              <Button
                onClick={handleOpen}
                variant="contained"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  background: "#0E2954",
                }}
              >
                اضافة مهمة
                <AddIcon />
              </Button>
              {/* -------------------------------------- */}

              {/* MODAL BOX CONTAIN 2 TEXTFIELD ,2 BUTTON */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={modalStyle}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", direction: "rtl" }}
                    gutterBottom
                  >
                    مهمة جديدة
                  </Typography>
                  <TextField
                    required
                    value={addInput.title}
                    onChange={(e) => {
                      let todo = {
                        title: e.target.value,
                        description: addInput.description,
                      };
                      setAddInput(todo);
                    }}
                    id="outlined-basic"
                    label="عنوان المهمة "
                    variant="outlined"
                    style={{
                      width: "100%",
                      height: "100%",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    value={addInput.description}
                    onChange={(e) => {
                      let todo = {
                        title: addInput.title,
                        description: e.target.value,
                      };
                      setAddInput(todo);
                    }}
                    id="outlined-basic"
                    label="تفاصيل المهمة "
                    variant="outlined"
                    style={{
                      width: "100%",
                      height: "100%",
                      fontWeight: "bold",
                    }}
                  />
                  <Grid
                    container
                    spacing={1}
                    style={{ marginTop: "10px" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid>
                      <Button
                        disabled={addInput.title == ""}
                        onClick={addTodo}
                        variant="contained"
                        style={{
                          height: "100%",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                      >
                        اضافة مهمة
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        style={{
                          height: "100%",
                          fontWeight: "bold",
                          background: "#DF2E38",
                          marginTop: "10px",
                        }}
                      >
                        الغاء
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </Grid>
          </Grid>

          {/* SOCIAL MEDIA ICONS */}
          <Grid
            container
            spacing={1}
            style={{ marginTop: "10px" }}
            display="flex"
            justifyContent="flex-end"
          >
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Link href="https://twitter.com/MDS_cs8" target="_blank">
                <TwitterIcon
                  className="social-icon"
                  style={{ color: "#393e4691" }}
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ahmed-algowaihi-27bbba250/"
                target="_blank"
              >
                <LinkedInIcon
                  className="social-icon"
                  style={{ color: "#393e4691" }}
                />
              </Link>
              <Link href="https://github.com/mds-cs8" target="_blank">
                <GitHubIcon
                  className="social-icon"
                  style={{ color: "#393e4691" }}
                />
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
