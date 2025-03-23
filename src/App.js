// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route, Outlet} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import ShowcasePage from './pages/ShowcasePage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/showcase' element={<ShowcasePage/>}/>
          <Route path='/:category/:subcategory' element={
               <div className="full-screen">
               <Header />
               <div className="category-container">
                 <Sidebar />
                 {/* <Display category={category} subcategory={subcategory} /> */}
                   <CategoryPage/>
               </div>
             </div>
            }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
