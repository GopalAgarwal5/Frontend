import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Create_Project from "./pages/Create_Project";
import Dashboard from "./pages/Dashboard";
import Dashboard_Page from "./components/Dashboard_Page";
import Project_List from "./pages/Project_List";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OpenRoute><Login /></OpenRoute>} />
        <Route element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard_Page />} />
          <Route path="/create_project" element={<Create_Project />} />
          <Route path="/project_list" element={<Project_List />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
