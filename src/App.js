import { Home, Main } from "./containers/public"
import { Route, Routes } from "react-router-dom";
import path from "./path/path"

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.MAIN} element={<Main />}>
          <Route path={path.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
