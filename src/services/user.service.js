import http from '../Axios.config';

// get all users function
const getAll = () => {
    return http.get('/users');
};

// get user by id function
const getById = (id) => {
    return http.get(`/users/${id}`);
};

// get user by email function
const getByEmail = (email) => {
    return http.get(`/users/email/${email}`);
};

// get user by username function
const getByUsername = (username) => {
    return http.get(`/users/username/${username}`);
};

// create user function
const createUser = (data) => {
    return http.post('/users', data);
};

// update user function
const updateUser = (id, data) => {
    return http.put(`/users/${id}`, data);
};

// delete user function
const deleteUser = (id) => {
    return http.delete(`/users/${id}`);
};

// login function
const login = (email, password) => {
    return http.post('/users/login', { email, password });
};

// signup function
const signup = (username, email, password) => {
    return http.post('/users/signup', { username, email, password });
};

const UserService = {
    getAll,
    getById,
    getByEmail,
    getByUsername,
    createUser,
    updateUser,
    deleteUser,
    login,
    signup,
};

export default UserService;

