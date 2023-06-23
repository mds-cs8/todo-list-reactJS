import logo from "./logo.svg";
import "./App.css";
import AllTodoList from "./components/AllTodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["todoFont"],
    },
    
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AllTodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
