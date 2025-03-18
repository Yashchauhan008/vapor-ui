// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import ShowcasePage from './pages/ShowcasePage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/showcase' element={<ShowcasePage/>}/>
          <Route path='/:category/:subcategory' element={<CategoryPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
