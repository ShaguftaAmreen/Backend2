import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Registration from './Registration';
import Login from './Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Home';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Registration />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
