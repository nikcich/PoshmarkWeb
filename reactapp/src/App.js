import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data').then((res) => res.json()).then((res) => {
      setData(res.Labels);
    });
  }, []);

  return (
    <div className='App'>
      <div className="parent">
        {data.map((item, idx) => (
          <div key={idx} className={"itemBox div" + (idx + 1)}>
            <h1 >{item}</h1>
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;
