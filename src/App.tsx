import React from "react";
import "./App.css";
import TitlePreview from "./components/TitlePreview/TitlePreview";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <div className="content">
            <TitlePreview />
          </div>
          <img src="img/ballBg.png" className="ballBg" alt="Ball Background" />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
