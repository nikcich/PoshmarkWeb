import './App.css';
import './Carb.scss';

import { useEffect, useState } from 'react';

import { Button, Loading, ToastNotification } from 'carbon-components-react';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data').then((res) => res.json()).then((res) => {
      setData(res.Labels);
    });
  }, []);

  return (
    <div className='App'>
      {/* <div className="parent">
        {data.map((item, idx) => (
          <div key={idx} className={"itemBox div" + (idx + 1)}>
            <h1 >{item}</h1>
          </div>
        ))}
      </div> */}
      {data.length < 1 && (
        <Loading />
      )}

      {data.map((item, idx) => (
        <ToastNotification
          caption={item}
          title="hi there"
          style={{ marginBottom: '.5rem' }}
          kind={"info"}
        />
      ))}

    </div>
  );
}

export default App;
