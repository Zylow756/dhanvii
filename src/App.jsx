import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      /*<div>
      <Nav />
      <div style={{ padding: "20px" }}>
        <h1>Welcome to Zylow</h1>
        <p>Scroll down to see sticky effect...</p>
        <div style={{ height: "1500px" }}></div>
      </div>
    </div>*/

  );
}

export default App;