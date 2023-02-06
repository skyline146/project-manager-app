import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { loadProjects } from "./redux/slices/projectsSlice";
import { hideModal } from "./redux/slices/modalSlice";
import { Modal } from "./components";

import { routes } from "./routes";

import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadProjects(
        JSON.parse(localStorage.getItem("projects") || JSON.stringify([]))
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(hideModal());
  }, [location.pathname]);

  return (
    <div className="App">
      <Modal />
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <Routes location={location}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
