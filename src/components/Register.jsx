import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PostUser from "../Api/PostUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const queryClient = useQueryClient();
  const [statusForm, setStatusForm] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["userCreate"],
    mutationFn: (data) => {
      PostUser({ ...data, year: new Date(data.year).toLocaleDateString() });
    },
    onSuccess: () =>{
      setStatusForm((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["users"] });

    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <Box>
      {!statusForm && (
        <Button
          sx={{ mb: 5 }}
          onClick={() => {
            setStatusForm((prev) => !prev);
          }}
          variant="contained"
        >
          Añadir nuevo Registro
        </Button>
      )}
      {statusForm && (
        <form
          onSubmit={handleSubmit((data) => {
            mutate(data), reset();
          })}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2.5,
              mb: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              py: 2,
              width: 400,
            }}
          >
            <Typography sx={{ color: "black" }} variant="h5" gutterBottom>
              Formulario de registro
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span
                  style={{ color: "red", textAlign: "left", marginTop: 10 }}
                >
                  Campo obligatorio
                </span>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Artist"
                variant="outlined"
                {...register("artist", { required: true })}
              />
              {errors.artist && (
                <span
                  style={{ color: "red", textAlign: "left", marginTop: 10 }}
                >
                  Campo obligatorio
                </span>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                type="date"
                id="outlined-basic"
                variant="outlined"
                {...register("year", { required: true })}
                sx={{ width: 195 }}
              />
              {errors.year && (
                <span
                  style={{ color: "red", textAlign: "left", marginTop: 10 }}
                >
                  Campo obligatorio
                </span>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Genre"
                variant="outlined"
                {...register("genre", { required: true })}
              />
              {errors.genre && (
                <span
                  style={{ color: "red", textAlign: "left", marginTop: 10 }}
                >
                  Campo obligatorio
                </span>
              )}
            </Box>
            <Button sx={{ width: 195 }} type="submit" variant="contained">
              Registrar
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default Register;
