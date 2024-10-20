import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './Routes';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
