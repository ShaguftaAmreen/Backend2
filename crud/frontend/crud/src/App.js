import AllRoutes from './AllRoutes';
import './App.css';
import AddItem from './components/AddItem';
import GetAllItems from './components/GetAllItems';
import {Link} from 'react-router-dom'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
</div>
  );
}

export default App;
