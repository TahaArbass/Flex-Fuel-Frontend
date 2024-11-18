import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MuscleGroupCard = React.memo(({ muscle }) => (
    <Card
        component={Link}
        to={`/exercises?muscle-group=${muscle.muscle_group_name}`}
        sx={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
            },
        }}
    >
        <CardMedia
            component="img"
            image={muscle.photo_url}
            alt={muscle.muscle_group_name}
            sx={{
                filter: "brightness(0.7)",
                transition: "filter 0.3s",
                "&:hover": { filter: "brightness(1)" },
                height: { xs: 100, sm: 300 },
            }}
        />
        <CardContent
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                textAlign: "center",
                transition: "background 0.3s",
                "&:hover": {
                    background: "rgba(0, 0, 0, 0.8)",
                },
            }}
        >
            <Typography sx={{ fontSize: '1.4rem' }}>{muscle.muscle_group_name}</Typography>
        </CardContent>
    </Card>
));

export default MuscleGroupCard;