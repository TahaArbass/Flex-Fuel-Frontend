import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/SignUpPage';
import DummyGrid from './components/DataGrid/dummyGrid';
import { AuthProvider } from './contexts/AuthContext';
import UnauthRedirectRoute from './utils/UnauthRedirectRoute';
import AuthRedirectRoute from './utils/AuthRedirectRoute';
import ExercisesPage from './pages/DisplayExercisesPage';
import ExerciseInfoPage from './pages/ExerciseInfoPage';
import ProfilePage from './pages/ProfilePage';
import UserList from './components/user/UsersList';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<UnauthRedirectRoute element={<LoginPage />} />} />
            <Route path='/signup' element={<UnauthRedirectRoute element={<SignUpPage />} />} />
            <Route path='/datagrid' element={<DummyGrid />} />
            <Route path='/exercises' element={<AuthRedirectRoute element={<ExercisesPage />} />} />
            <Route path='/exercises/:exerciseId' element={<AuthRedirectRoute element={<ExerciseInfoPage />} />} />
            <Route path='/profile/:username' element={<AuthRedirectRoute element={<ProfilePage />} />} />
            <Route path='/gymbros' element={<AuthRedirectRoute element={<UserList />} />} />
          </Routes>
        </Router >
      </AuthProvider>
    </>
  )
}

export default App
