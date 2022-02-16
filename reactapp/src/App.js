import './App.css';
import './Carb.scss';

import { useEffect, useState } from 'react';

import { Button, Loading, ToastNotification } from 'carbon-components-react';

import HeaderBar from './components/Header';

function App() {

  const [data, setData] = useState([]);

  const [page, setPage] = useState('/'); // Page route, '/' being root, '/PlanView' etc

  useEffect(() => {
    fetch('http://localhost:5000/data').then((res) => res.json()).then((res) => {
      setData(res.Labels);
    });
  }, []);

  return (
    <div className='App'>
      <HeaderBar page={page} setPage={setPage} />
      {data.length < 1 && (
        <Loading />
      )}



      {/* Conditional Rendering based on page */}

      {page === "/Plan" && (
        data.map((item, idx) => (
          <ToastNotification
            caption={item}
            title="hi there"
            style={{ marginBottom: '.5rem' }}
            kind={"info"}
            key={idx}
          />
        ))
      )}

      {page === "/Data" && (
        <h1> This is the Data View Page</h1>
      )}



    </div>
  );
}

export default App;
