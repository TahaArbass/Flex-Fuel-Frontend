import http from '../Axios.config';

// get all muscle groups function
const getAll = () => {
    return http.get('/muscle-groups');
};

// get muscle group by id function
const getById = (id) => {
    return http.get(`/muscle-groups/${id}`);
};

// get muscle group by muscle group name function
const getByMuscleGroupName = (muscle_group_name) => {
    return http.get(`/muscle-groups/name/${muscle_group_name}`);
};

// create muscle group function
const createMuscleGroup = (data) => {
    return http.post('/muscle-groups', data);
};

// update muscle group function
const updateMuscleGroup = (id, data) => {
    return http.put(`/muscle-groups/${id}`, data);
};

// delete muscle group function
const deleteMuscleGroup = (id) => {
    return http.delete(`/muscle-groups/${id}`);
};

const MuscleGroupService = {
    getAll,
    getById,
    getByMuscleGroupName,
    createMuscleGroup,
    updateMuscleGroup,
    deleteMuscleGroup,
};

export default MuscleGroupService;