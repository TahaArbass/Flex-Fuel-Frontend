import React from "react";

import ExerciseDetail from "../components/user/ExerciseDetail";
import { useParams } from "react-router-dom";

const ExerciseInfoPage = () => {
    const { exerciseId } = useParams();
    return <ExerciseDetail exerciseId={exerciseId} />;
};

export default ExerciseInfoPage;