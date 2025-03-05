import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
