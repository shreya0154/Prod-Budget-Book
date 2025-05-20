import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    // <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}/>
        {/* <Route path="/" element={<Homepage/>}/> */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      
    // </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }
  else{
    return <Navigate to="/login"/>
  }
}
export default App;
