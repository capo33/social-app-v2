import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// Material Ui
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  Button,
  CardContent,
  Divider,
} from "@mui/material";

// Material Icon
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  deleteUserProfile,
  userProfile,
} from "../../redux/fetures/User/userSlice";
import { getAllPosts } from "../../redux/fetures/Post/postSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { logout } from "../../redux/fetures/Auth/authSlice";

function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.posts);
  const { user: me } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const owenPosts = posts.filter((post) => post?.postedBy?._id === user?._id);
  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    user && dispatch(userProfile(token));
  }, [dispatch, user, token]);

  // Delete user
  const handleDelete = () => {
    dispatch(logout());
    dispatch(
      deleteUserProfile({
        token,
        toast,
        navigate,
      })
    );
  };
  return (
    <Container sx={{ my: 10 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          <Avatar
            src={me?.image}
            alt={me?.username}
            sx={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              mr: 3,
            }}
          />

          <Typography variant='h5' sx={{ my: 2 }}>
            {me?.username}
          </Typography>
          <Typography variant='body1' sx={{ my: 2 }}>
            @{me?.username}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to='/update-profile'>
              <Button variant='contained' color='info' fullWidth>
                <SettingsIcon />
              </Button>
            </Link>
            <Button variant='contained' color='error' onClick={handleDelete}>
              <DeleteForeverIcon />
            </Button>
          </Box>
        </Box>

        <Typography variant='body1' sx={{ my: 2 }}>
          {me?.bio ? `Bio: ${me?.bio}` : "No Bio"}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <span>
            <strong>{owenPosts?.length} </strong>
            {owenPosts?.length === 1 ? " post" : "posts "}
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{me?.followers?.length}</strong> followers
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{me?.following?.length}</strong> following
          </span>
        </Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        <Typography variant='h6'>Posts</Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        {owenPosts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No posts yet</h2>
        )}

        <Grid container spacing={2}>
          {owenPosts &&
            owenPosts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <CardContent>
                    <Typography variant='body2'>{post.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Container>
  );
}

export default Profile;
