import 'bootstrap/dist/css/bootstrap.min.css'
import SignIn from './Project/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Routter from './Project/Routter';
import Blog from './Project/Blog';
import ContactUs from './Project/ContactUs';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Routter />}>
          <Route path="signin" element={<SignIn />}/>
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
