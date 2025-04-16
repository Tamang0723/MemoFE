import Register from "./compontents/Register";
import Login from "./compontents/Login";
import Business from "./compontents/Business";
import Caregiver from "./compontents/Caregiver";
import Tourism from "./compontents/Tourism";
import Home from "./compontents/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import OneMemo from "./compontents/OneMemo";
import MemoB from "./compontents/MemoB";
import MemoK from "./compontents/MemoK";
import MemoT from "./compontents/MemoT";

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
        <Route path="/memolist" element={<MemoB/>} />

        <Route path="/memolistkaigo" element={<MemoK />} />
        <Route path="/memolisttourism" element={<MemoT/>} />
        <Route path="/memoview" element={<OneMemo/>} />
        </Routes>
        </BrowserRouter>







    </div>
  );
}

export default App;
