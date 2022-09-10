import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Error404 } from "./pages/Error404";
import { Guide } from "./pages/Guide";
import { Introduce } from "./pages/Introduce";
import { Record } from "./pages/Record";
import { Start } from "./pages/Start";

const App = () => {
  return(
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Introduce />} />
          <Route path={'/guide'} element={<Guide />}/>
          <Route path={'/start'} element={<Start />}/>
          <Route path={'/record'} element={<Record />}/>
          <Route path={'*'} element={<Error404 />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;