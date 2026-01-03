
import { Main } from './components/utils/styled_components'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Home from './routes/home';
import Detail from './routes/detail';
import NotFound from './routes/notfound';
import './App.css'

function router() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:breed' element={<Detail />} />
        <Route path='/detail/:breed/:subbreed' element={<Detail />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='*' element={<Navigate to="/notfound" />} />
      </Route>
    )
  );
}

function App() {
  return (
    <Main.Wrapper>
      <Main.Header>
        <div id="row" style={{ alignItems: "center", justifyContent: "center", height: "100%", display: "grid", gridTemplateColumns: "auto auto 1fr", gridTemplateRows: "1fr" }}>
          <img src="https://dog.ceo/img/dog-api-logo.svg" style={{ height: "8vh", margin: "0 2vw", display: "inline-block" }} alt="Dog API Logo" />
          <h2>Dog API Tech Test</h2>
        </div>
      </Main.Header>
      <Main.Content>
        <div style={{ height: 'max-content' }}>
          <RouterProvider router={router()} />
        </div>

      </Main.Content>
      <Main.Footer></Main.Footer>
      <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet" />
    </Main.Wrapper >
  )
}

export default App
