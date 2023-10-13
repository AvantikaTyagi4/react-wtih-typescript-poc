import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/LoginPage";
import ItemList from "./Components/ItemList/item-list";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/itemList" element={<ItemList></ItemList>}></Route>
    </Routes>
  );
}

export default App;
