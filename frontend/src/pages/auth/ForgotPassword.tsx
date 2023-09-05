import * as React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAppDispatch } from "../../redux/app/store";
import { IForgotPassword } from "../../interfaces/AuthInterface";
import { forgotPassword } from "../../redux/fetures/Auth/authSlice";

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState<IForgotPassword>({
    email: "",
    answer: "",
    newPassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const resetForm = () => {
    setFormData({
      email: "",
      answer: "",
      newPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword({ formData, toast, navigate }));
    resetForm();
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
          <PasswordIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          No Worries! We got you!
        </Typography>
        <Typography component='p' variant='h6'>
          Do you remember your security answer? 😉
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='answer'
            label='Security Answer'
            name='answer'
            autoComplete='answer'
            onChange={handleChange}
            value={formData.answer}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='newPassword'
            label='New Password'
            type={showPassword ? "text" : "password"}
            id='newPassword'
            autoComplete='current-password'
            onChange={handleChange}
            value={formData.newPassword}
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
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/login'>Remembered your password?</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
