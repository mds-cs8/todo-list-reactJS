import { useState } from "react";
import * as React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

// END MUI LIBRARY

// LIBRARY TO SET RANDON ID
import { v4 as uuidv4 } from "uuid";
// END LIBRARY TO SET RANDON ID

// COMPONENT & Context
import TodoItem from "./TodoItem";
import { Todos } from "../context/Todos";
// END COMPONENT

export default function AllTodoList() {
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
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

  // ALL USESTATE HOOKS
  const { todos, setTodos } = useContext(Todos);
  const [open, setOpen] = React.useState(false); // STATE TO OPEN OR CLOSE MODAL
  const [addInput, setAddInput] = useState({ title: "", description: "" });
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  //----------------------------------------------------------------------------
  const handleOpen = () => setOpen(true); // FUNCTION TO OPEN MODAL
  const handleClose = () => setOpen(false); // FUNCTION TO CLOSE MODAL

  // filteration arrays

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed todos");
      return t.isDone;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling not completed todos");
      return !t.isDone;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  // ===== HANDLERS
  // function changeDisplayedType(e) {
  //   setDisplayedTodosType(e.target.value);
  // }

  const notify = (str) =>
    toast.success(`${str}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    notify("تم اضافة المهمة بنجاح");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    notify("تم حذف المهمة بنجاح");
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          description: dialogTodo.description,
        };
      } else {
        return t;
      }
    });

    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const show = todosToBeRendered.map((item) => {
    // CREATE TODO
    return (
      <TodoItem
        key={item.id}
        todo={item}
        openDeleteBox={openDeleteDialog}
        openEditBox={openUpdateDialog}
        notify={notify}
      />
    );
  });
  useEffect(() => {
    // USE EFFECT TO RENDER GET LOCAL STORAGE 1 TIME
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  return (
    <>
      <ToastContainer />

      <Dialog
        open={showDeleteDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteDialogClose}
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
            onClick={handleDeleteConfirm}
          >
            نعم
          </Button>
          <Button
            style={{
              background: "#DF2E38",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={handleDeleteDialogClose}
          >
            لا
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showUpdateDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ fontWeight: "bold", direction: "rtl" }}>
          {"هل تريد تعديل المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box display="flex" flexDirection="column" justifyContent="center">
              <TextField
                label="عنوان المهمة "
                id="outlined-required"
                defaultValue="Hello World"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  marginTop: "5px",
                }}
                value={dialogTodo?.title}
                onChange={(e) => {
                  setDialogTodo({
                    ...dialogTodo,
                    title: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-required"
                defaultValue="Hello World"
                label="تفاصيل المهمة "
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                }}
                value={dialogTodo?.description}
                onChange={(e) => {
                  setDialogTodo({
                    ...dialogTodo,
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
            onClick={handleUpdateConfirm}
          >
            تعديل
          </Button>
          <Button
            style={{
              background: "#DF2E38",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={handleUpdateClose}
          >
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
        <Card
          sx={{ textAlign: "center" }}
          md={{
            Height: "500px",
          }}
          style={{
            minHeight: "200px",
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
              value={displayedTodosType}
              onChange={(e) => {
                setDisplayedTodosType(e.target.value);
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
                value="completed"
                onChange={(e) => {
                  setDisplayedTodosType(e.target.value);
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    background: "#82CD47",
                    top: "0",
                    left: "0",
                    fontSize: "10px",
                    padding: "0 5px",
                    borderBottomRightRadius: "50%",
                  }}
                >
                  {completedTodos.length}
                </span>
                المنجز
              </ToggleButton>
              <ToggleButton
                style={{ fontWeight: "bold", color: "#fff" }}
                value="non-completed"
                onChange={(e) => {
                  setDisplayedTodosType(e.target.value);
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    background: "#F65A83",
                    top: "0",
                    left: "0",
                    fontSize: "10px",
                    padding: "0 5px",
                    borderBottomRightRadius: "50%",
                  }}
                >
                  {notCompletedTodos.length}
                </span>
                غير منجز
              </ToggleButton>
              <ToggleButton
                style={{ fontWeight: "bold", color: "#fff" }}
                value="all"
                onChange={(e) => {
                  setDisplayedTodosType(e.target.value);
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
                          disabled={addInput.title === ""}
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
              style={{
                marginTop: "20px",
              }}
              display="flex"
              justifyContent="flex-end"
              alignItems="end"
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
    </>
  );
}
