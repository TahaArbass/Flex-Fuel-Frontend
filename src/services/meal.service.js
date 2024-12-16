import http from '../Axios.config';

// get all meals
const getAllMeals = () => {
    return http.get('/meals');
};

// get meal by id
const getMealById = (id) => {
    return http.get(`/meals/${id}`);
};

// create new meal
const createMeal = (data) => {
    return http.post('/meals', data);
};

// update meal by id
const updateMeal = (id, data) => {
    return http.put(`/meals/${id}`, data);
};

// delete meal by id
const deleteMeal = (id) => {
    return http.delete(`/meals/${id}`);
};

const MealService = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
};

export default MealService;