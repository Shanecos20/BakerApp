import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <NavigationBar />
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;