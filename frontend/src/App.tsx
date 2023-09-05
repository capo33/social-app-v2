import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box, Grid } from "@mui/material";

import { useAppSelector } from "./redux/app/store";
import { Header, Sidebar } from "./components/Index";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      {!user && <Header />}
      <Grid container>
        <Grid item md={3} sm={2} xs={12}>
          {user && <Sidebar />}
          <Toaster />
        </Grid>
        <Grid item md={7 } sm={10} xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
