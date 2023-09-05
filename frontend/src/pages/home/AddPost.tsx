import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// Material UI
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

// Material UI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Cloudinary from "../../cloudinary/Cloudinary";
import { IPostCreate } from "../../interfaces/PostInterface";
import { createPost } from "../../redux/fetures/Post/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const AddPost = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<IPostCreate>({
    title: "",
    description: "",
    image: "",
    tags: [],
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  // Submit form
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createPost({
        formData,
        token,
        toast,
      })
    );
    navigate("/");
    setFormData({
      title: "",
      description: "",
      image: "",
      tags: [],
    });
  };

  // Delete image
  const deleteImage = () => {
    setFormData({ ...formData, image: "" });
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: 10 }}>
      <Typography variant='h4' color='#01579B'>
        Add Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} direction='row' sx={{ marginBottom: 4 }}>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type='text'
          variant='outlined'
          color='primary'
          label='Description'
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          multiline
          value={formData.description}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type='text'
          variant='outlined'
          color='primary'
          label='Tags'
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(",") })
          }
          value={formData.tags}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <Stack>
          <Button variant='outlined' component='label'>
            <IconButton
              aria-label='upload picture'
              component='label'
              size='small'
            >
              {/* Upload image to cloudinary */}
              <Cloudinary setFormData={setFormData} formData={formData} />
              <PhotoCamera />
              Upload
            </IconButton>
          </Button>
        </Stack>
        {formData.image && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={formData.image}
              alt={formData.title}
              style={{
                width: "50%",
                height: "50%",
                objectFit: "cover",
                margin: "5px auto",
              }}
            />
            <Button component='label' onClick={deleteImage}>
              <HighlightOffIcon style={{ color: "gray", fontSize: "40px" }} />
            </Button>
          </Box>
        )}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='info'
          sx={{ mt: 3, mb: 2 }}
        >
          Add Post
        </Button>
      </Box>
    </Container>
  );
};

export default AddPost;
