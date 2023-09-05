import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// Material UI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// Material UI Icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import {
  updateUserProfile,
  userProfile,
} from "../../redux/fetures/User/userSlice";
import Cloudinary from "../../cloudinary/Cloudinary";
import { IUpdateUser } from "../../interfaces/UserInterface";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { user: me } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<IUpdateUser>({
    username: user?.username ? user?.username : "",
    email: user?.email ? user?.email : "",
    bio: user?.bio ? user?.bio : "",
    image: user?.image ? user?.image : "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (me) {
      setFormData({
        username: me?.username as string,
        email: me?.email as string,
        bio: me?.bio as string,
        image: me?.image as string,
      });
    }
  }, [me]);

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({
        formData,
        token,
        toast,
        navigate,
      })
    );
  };

  return (
    <Container maxWidth={"lg"}>
      <Box
        sx={{ my: 10 }}
        component={"form"}
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container gap={4}>
          <Grid item>
            <Typography variant='h6'>Update Profile</Typography>
            <Box>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <img src={formData?.image} alt='' style={{ width: "30%" }} />
                </Grid>
                <Grid item xs={12}>
                  <Button component='label' variant='outlined'>
                    {/* Upload image to cloudinary */}
                    <Cloudinary setFormData={setFormData} formData={formData} />
                    <CameraAltIcon sx={{ mr: 1 }} /> Upload Photo
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='username'
                    onChange={handleChange}
                    value={formData?.username}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='email'
                    onChange={handleChange}
                    value={formData?.email}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={!formData?.bio ? "Bio" : ""}
                    name='bio'
                    onChange={handleChange}
                    value={formData?.bio}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box component={"button"} sx={{ mt: 2 }}>
          <Cloudinary formData={formData} setFormData={setFormData} />
        </Box>
        <Button
          variant='contained'
          color='info'
          fullWidth
          sx={{ mt: 2 }}
          type='submit'
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
