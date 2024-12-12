import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Read from './components/Read';
import Create from './components/Create';
import Edit from './components/Edit';
import Login from './components/Login';
import Register from './components/Register';
import RecipeDetails from './components/RecipeDetails';
import MyRecipes from './components/MyRecipes';
//import App.css from './App.css';
import './App.css';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/read" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} /> 
        <Route path="/my-recipes" element={<MyRecipes />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;