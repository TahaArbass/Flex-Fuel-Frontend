import http from '../Axios.config';

// get all muscles
const getAll = () => {
    return http.get('/muscles');
};

// get muscle by id
const getById = (id) => {
    return http.get(`/muscles/${id}`);
};

// create new muscle
const createMuscle = (data) => {
    return http.post('/muscles', data);
};

// update muscle by id
const updateMuscle = (id, data) => {
    return http.put(`/muscles/${id}`, data);
};

// delete muscle by id
const deleteMuscle = (id) => {
    return http.delete(`/muscles/${id}`);
};

const MuscleService = {
    getAll,
    getById,
    createMuscle,
    updateMuscle,
    deleteMuscle,
};

export default MuscleService;
