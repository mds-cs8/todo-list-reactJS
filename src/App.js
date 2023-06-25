import logo from "./logo.svg";
import "./App.css";
import AllTodoList from "./components/AllTodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Todos } from "./context/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  const theme = createTheme({
    typography: {
      fontFamily: ["todoFont"],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Todos.Provider value={{ todos, setTodos }}>
          <AllTodoList />
        </Todos.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
