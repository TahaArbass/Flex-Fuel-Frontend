import React from "react";
import { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import * as Yup from "yup";
import { Autocomplete, Box, Typography, TextField, Paper } from "@mui/material";
import MuscleService from "../../services/muscle.service";
import ExerciseService from "../../services/exercise.service";
import { notifyError } from "../../utils/toastNotification";

const ExerciseFormComponent = ({ isEdit = false, id = null }) => {
    const [muscles, setMuscles] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [initialValues, setInitialValues] = useState({
        exercise_name: "",
        exercise_description: "",
        exercise_steps: "",
        video_url: "",
    });

    const fields = [
        { name: "exercise_name", label: "Exercise Name", type: "text" },
        { name: "exercise_description", label: "Exercise Description", type: "text" },
        { name: "exercise_steps", label: "Exercise Steps", type: "text" },
        { name: "photo_url", label: "Photo", type: "file" },
        { name: "video_url", label: "Video URL", type: "text" },
    ];

    const validationSchema = Yup.object({
        exercise_name: Yup.string().required("Required"),
        exercise_description: Yup.string().required("Required"),
        exercise_steps: Yup.string().required("Required"),
        video_url: Yup.string().url("Invalid URL"),
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch data if in edit mode
                if (isEdit && id) {
                    const exerciseResponse = await ExerciseService.getById(id);
                    setInitialValues(exerciseResponse.data);
                }
                // fetch muscles
                const musclesResponse = await MuscleService.getAll();
                setMuscles(musclesResponse.data);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || "Failed to fetch data");
            }
        };
        fetchData();
    }, [isEdit, id]);


    // submit function
    const onSubmit = async (values) => {
        // add the muscle_id to the values
        values.targeted_muscle_id = selectedMuscle.id;
        console.log(values);
        if (isEdit) {
            ExerciseService.updateExercise(id, values);
        } else {
            ExerciseService.createExercise(values);
        }
    }

    return (
        <>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {isEdit ? "Edit Exercise" : "Add Exercise"}
                    </Typography>
                    {/* Autocomplete for selecting muscle */}
                    <Autocomplete
                        options={muscles}
                        getOptionLabel={(option) => option.muscle_name}
                        onChange={(event, value) => setSelectedMuscle(value)} // update selectedMuscle
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Muscle"
                                variant="outlined"
                            />
                        )}
                    />

                    {/* Form component */}
                    <FormComponent
                        fields={fields}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        buttonText={isEdit ? "Save" : "Add"}
                    />
                </Box>
            </Paper>
        </>
    );
}

export default ExerciseFormComponent;