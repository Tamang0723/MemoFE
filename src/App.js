import Register from "./compontents/Register";
import Login from "./compontents/Login";
import Business from "./compontents/Business";
import Caregiver from "./compontents/Caregiver";
import Tourism from "./compontents/Tourism";
import Home from "./compontents/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import OneMemo from "./compontents/OneMemo";
import Memo from "./compontents/Memo";

function App() {
return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/register" element= { <Register/>} />
        <Route path="/" element= {<Login/>} />
        <Route path="/business" element={<Business/>} />
        <Route path="/caregiver" element={<Caregiver/>} />
        <Route path="/tourism" element={<Tourism/>} />
        <Route path="/memolist" element={<Memo/>} />
        <Route path="/memoview" element={<OneMemo/>} />
        </Routes>
        </BrowserRouter>







    </div>
  );
}

export default App;
