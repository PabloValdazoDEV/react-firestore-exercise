import Listado from "./Listado";
import Register from "./Register";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        maxWidth:400
      }}
    >
      <Register />
      <Listado />
    </Box>
  );
};

export default Home;
