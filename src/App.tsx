import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadProjects } from './redux/slices/projectsSlice';

import { routes } from './routes';

import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjects(JSON.parse(localStorage.getItem('projects') || JSON.stringify([]))));
  }, [dispatch]);

  return (
    <div className="App">
      {/* <RouterProvider router={router}/> */}
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}/>
        ))}
      </Routes>
    </div>
  );
}

export default App;
