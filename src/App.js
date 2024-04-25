import { Album, Home, Main, Radio, Zingchart, TopSongs } from "./containers/public"
import { WeekChartItems } from "./components"
import { Library } from "./containers/system"
import { Route, Routes } from "react-router-dom";
import path from "./utils/path"
import { useEffect } from 'react'
import * as actions from './store/actions/home'
import { useDispatch } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css'

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
          <Route path={path.PLAYLIST} element={<Album />} />
          <Route path={path.WEEKCHART} element={<WeekChartItems />} />
          <Route path={path.HUD} element={<Album />} />
          <Route path={path.NEWSONGS} element={<TopSongs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
