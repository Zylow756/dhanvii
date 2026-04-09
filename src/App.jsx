import Home from './pages/Home';
import About from './pages/About';
import Contact from "./pages/Contact";
import Training from "./pages/Courses";
import Career from "./pages/Career";
import Services from "./pages/Services";
import Placement from "./pages/Placement";
// Gallery Pages
import FuncGallery from "./pages/gallery/FuncGallery";
import InstitGallery from "./pages/gallery/InstitGallery";
import { Routes, Route } from 'react-router-dom'; 

import Admin from "./pages/admin/Admin";
import AdminPlacement from "./pages/admin/AdminPlacement";
import AdminReview from "./pages/admin/AdminReview";
import ProtectedRoute from "./components/logoutPopup/ProtectedRoute"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Training />} />
        <Route path="/career" element={<Career />} />
        <Route path="/services" element={<Services />} />
        <Route path="/placement" element={<Placement />} />

        {/*  Gallery Routes */}
        <Route path="/func-gallery" element={<FuncGallery />} />
        <Route path="/instit-gallery" element={<InstitGallery />} />

        {/*<Route path="/adminPlacement" element={<AdminPlacement />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminReview" element={<AdminReview />} />*/}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminPlacement"
          element={
            <ProtectedRoute>
              <AdminPlacement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminReview"
          element={
            <ProtectedRoute>
              <AdminReview />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;