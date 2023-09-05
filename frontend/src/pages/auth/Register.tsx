import * as React from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Material UI
import {
  Container,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { IAuthUser } from "../../interfaces/AuthInterface";
import { register } from "../../redux/fetures/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState<IAuthUser>({
    username: "",
    email: "",
    password: "",
  });

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = user?.token;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (token) {
      navigate(redirect);
    } else {
      navigate("/register");
    }
  }, [token, navigate, redirect]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ formData, toast, navigate }));
  };

  return (
    <Container maxWidth='sm'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={showPassword ? "text" : "password"}
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={formData.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, backgroundColor: "cadetblue" }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgot-password'>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to='/login'>{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
