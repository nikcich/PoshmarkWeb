import './App.css';
import './Carb.scss';
import './Charts.scss';

import { useEffect, useState } from 'react';
import { Loading, Modal, TextInput } from 'carbon-components-react';

import Table from './components/Table';

function App() {

  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setLoading(true);

    fetch('https://poshapi.cichosz.dev/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'body': JSON.stringify({
          username: username,
          password: password
        })
      },
    }).then(data => {
      setLoading(false);
      if(data.status === 200){
        setAuth(true);
      }
    });
  }

  useEffect(() => {

  }, []);

  return (
    <div className='App'>

      {loading && <Loading />}

      {auth &&
        <Table />
      }

      {!auth && (
        <Modal
          open={!loading}
          modalHeading="Login"
          modalLabel="Login to access the app"
          primaryButtonText="Login"
          onRequestSubmit={() => handleLogin()}
        >

          <TextInput
            data-modal-primary-focus
            id="username"
            labelText="Username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <TextInput
            id="password"
            labelText="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Modal>
      )}



    </div>
  );
}

export default App;
