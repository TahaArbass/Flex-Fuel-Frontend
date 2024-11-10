import http from '../Axios.config';


const login = (email, password) => {
    return http.post('/users/login', { email, password });
};

const signup = (username, email, password) => {
    return http.post('/users/signup', { username, email, password });
};

const UserService = {
    login,
    signup,
};

export default UserService;

