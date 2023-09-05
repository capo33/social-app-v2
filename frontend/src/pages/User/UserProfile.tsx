import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

import {
  followUser,
  unfollowUser,
  userProfile,
  userProfileById,
} from "../../redux/fetures/User/userSlice";
import { getAllPosts } from "../../redux/fetures/Post/postSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const { user } = useAppSelector((state) => state.auth);
  const { guest, user: me } = useAppSelector((state) => state.user);

  const followerMap = guest?.user?.followers?.map(
    (follower: any) => follower._id as string
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userProfileById(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      dispatch(userProfile(user?.token as string));
    }
  }, [dispatch, user]);

  // Like post
  const handFollow = async (id: string) => {
    dispatch(
      followUser({
        followId: id as string,
        userId: guest?.user._id as string,
        token: user?.token as string,
      })
    );
  };

  // Unlike post
  const handleUnfollow = async (id: string) => {
    dispatch(
      unfollowUser({
        followId: id as string,
        userId: me?._id as string,
        token: user?.token as string,
      })
    );
  };

  return (
    <Container sx={{ my: 10 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            src={guest?.user?.image}
            alt={guest?.user?.username}
            sx={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              mr: 3,
            }}
          />
          <Box component={'div'}>
            <Typography variant='h5'>{guest?.user?.username}</Typography>
            <Typography variant='body1'>@{guest?.user?.username}</Typography>

            {/* Follow & UnFollow */}
            {followerMap?.includes(user?._id as string) ? (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleUnfollow(guest?.user?._id as string)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handFollow(guest?.user?._id as string)}
              >
                Follow
              </Button>
            )}
          </Box>
        </Box>
        
        <Typography variant='body2' sx={{ mb: 1 }}>
          {guest?.user?.bio ? `Bio: ${guest?.user?.bio}` : "No Bio"}
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
            <strong>{guest?.posts?.length}</strong>
            {guest?.posts?.length === 1 ? " post" : " posts "}
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{guest?.user?.followers?.length}</strong> followers
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{guest?.user?.following?.length}</strong> following
          </span>
        </Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        <Typography variant='h6'>Posts</Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        {guest?.posts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No posts yet</h2>
        )}

        <Grid container spacing={2}>
          {guest?.posts &&
            guest?.posts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "auto" }}
                    loading='lazy'
                  />
                  <CardContent>
                    <Typography variant='body2'>{post.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Container>
  );
}

export default UserProfile;
