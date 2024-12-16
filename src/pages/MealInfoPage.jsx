import React from "react";
import MealDetail from "../components/meal/MealDetail";

import { useParams } from "react-router-dom";

const MealInfoPage = () => {
    const { mealId } = useParams();
    return <MealDetail mealId={mealId} />;
}

export default MealInfoPage;