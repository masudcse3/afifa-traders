/** @format */

import { CssBaseline, ThemeProvider, Box } from "@mui/material";

import { Route, Routes } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import Header from "./scenes/global/Header";

import Authentication from "./components/Auth/Authentication";
import Dashboard from "./scenes/Dashbaord";
import Login from "./scenes/Auth/Login";
import NotFound from "./scenes/global/NotFound";

import Products from "./scenes/Product/Products";
import Purchases from "./scenes/Buy/Purchases";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />

        <Box sx={{ flexGrow: 1 }}>
          <Box p={2}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Authentication />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/purchases" element={<Purchases />} />
              </Route>

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
