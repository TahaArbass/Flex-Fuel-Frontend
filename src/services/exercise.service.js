import http from '../Axios.config';

// get all exercises function
const getAll = () => {
    return http.get('/exercises');
};

// get exercise by id function
const getById = (id) => {
    return http.get(`/exercises/${id}`);
};

// get exercise by exercise name function
const getByExerciseName = (exercise_name) => {
    return http.get(`/exercises/name/${exercise_name}`);
};

// get exercise by muscle group name function
const getByMuscleGroupName = (muscle_group_name) => {
    return http.get(`/exercises/muscle-group/${muscle_group_name}`);
};

// create exercise function
const createExercise = (data) => {
    return http.post('/exercises', data);
};

// update exercise function
const updateExercise = (id, data) => {
    return http.put(`/exercises/${id}`, data);
};

// delete exercise function
const deleteExercise = (id) => {
    return http.delete(`/exercises/${id}`);
};

const ExerciseService = {
    getAll,
    getById,
    getByExerciseName,
    getByMuscleGroupName,
    createExercise,
    updateExercise,
    deleteExercise,
};

export default ExerciseService;

