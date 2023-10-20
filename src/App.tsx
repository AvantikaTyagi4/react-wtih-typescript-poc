import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/LoginPage";
import ItemList from "./Components/ItemList/item-list";
import ProtectedRoute from "./shared/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
      <Route path="/" element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="itemList" element={<ItemList></ItemList>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
