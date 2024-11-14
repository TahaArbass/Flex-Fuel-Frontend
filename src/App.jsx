import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/SignUpPage';
import DummyGrid from './components/DataGrid/dummyGrid';
import UserNavbar from './components/UserNavbar';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/datagrid' element={<DummyGrid />} />
          <Route path='/usernavbar' element={<UserNavbar />} />
        </Routes>
      </Router >
    </>
  )
}

export default App
