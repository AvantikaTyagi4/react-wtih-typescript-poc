import { Navigate, Outlet } from "react-router-dom";

const userAuth=()=>{
    const user = localStorage.getItem('user')
    if (user === 'true'){
        return true;
    }
    else{
        return false;
    }
}

const ProtectedRoute =(props:any) =>{
    const auth = userAuth();
    return auth?<Outlet/>:<Navigate to="/login"></Navigate>
}

export default ProtectedRoute;