import './App.css';
import Users from './components/Users';
import Login from './components/Login';
import {Routes , Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/users' element={<Users />}/>
      </Routes>
    </div>
  );
}

export default App;
