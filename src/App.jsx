import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";
import "./styles/global.scss";

function renderRoutes(routeList) {
  return routeList.map(({ path, element, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
