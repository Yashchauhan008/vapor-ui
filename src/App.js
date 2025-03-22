// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import ShowcasePage from './pages/ShowcasePage';
import Layout from './Layout';
import Display from './components/Display';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/showcase' element={<ShowcasePage/>}/>
          <Route path='/:category/:subcategory' element={<Layout/>}>
            <Route index element={<Display/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
