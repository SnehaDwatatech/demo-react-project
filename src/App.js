import "./App.css";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="App" element={<App />} />
          <Route path="" element={<Layout />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
