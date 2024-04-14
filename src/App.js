import { Playlist, Home, Main, Radio, Zingchart } from "./containers/public"
import { Library } from "./containers/system"
import { Route, Routes } from "react-router-dom";
import path from "./utils/path"
import { useEffect } from 'react'
import * as actions from './store/actions/home'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  }, [])
  return (
    <div>
      <Routes>
        <Route path={path.MAIN} element={<Main />}>
          <Route path={path.LIBRARY} element={<Library />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ZINGCHART} element={<Zingchart />} />
          <Route path={path.RADIO} element={<Radio />} />
          <Route path={path.PLAYLIST} element={<Playlist />} />
          <Route path={path.HUD} element={<Playlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
