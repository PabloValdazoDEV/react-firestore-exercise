import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GetAllUsers from "../Api/GetAllUsers";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteUser from "../Api/DeleteUser";
import { Button } from "@mui/material";

const Listado = () => {

  const queryClient = useQueryClient();
  
  const { mutate: btnDelete } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (userId) => {
      DeleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUsers,
  });
  if (isLoading) {
    return (
      <>
        <h1>Cargando...</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "white",
        borderRadius: 2.5,

      }}
    >
      {data.map((dataEl, i) => {
        return (
          <div key={dataEl.id}>
            <ListItem
              alignItems="flex-start"
              sx={{ width: 400, textAlign: "center", height:100 }}
            >
              <ListItemText
                sx={{ color: "black" }}
                primary={dataEl.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      {dataEl.artist}
                    </Typography>
                    {` — Género: ${dataEl.genre}`}
                    <br />
                    <Typography variant="body3" color="text.secondary">
                      Año de la publicación:{" "}
                      <span style={{ color: "black" }}>{dataEl.year}</span>
                    </Typography>
                  </React.Fragment>
                }
              />
                <Button sx={{my: "auto", ml:2 }} onClick={()=>{btnDelete(dataEl.id)}} variant="contained">Borrar</Button>
            </ListItem>
            {data.length != i + 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
};
export default Listado;
