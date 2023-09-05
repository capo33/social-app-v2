import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Alert,
} from "@mui/material";

import { getSavedPosts } from "../../redux/fetures/Post/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const SavedPosts = () => {
  const { savedPosts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getSavedPosts({ userId: user?._id as string, token }));
  }, [dispatch, user?._id, token]);

  return (
    <Container>
      <Typography variant='h4' sx={{ mt: 3 }}>
        Saved Posts
      </Typography>
      <Grid item xs={12} sm={12}>
        <CardActionArea component='a' href='#'>
          {savedPosts?.length === 0 && (
            <Alert variant='outlined' severity='info'>
              No saved posts yet
            </Alert>
          )}
          {savedPosts &&
            savedPosts.map((post) => (
              <Card sx={{ display: "flex", my: 2 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component='h2' variant='h5'>
                    {post.title}
                  </Typography>

                  <Typography variant='subtitle1' paragraph>
                    {post.description}
                  </Typography>
                  <Link to={`/post/${post._id}`}>
                    <Typography variant='subtitle1' color='primary'>
                      Continue reading...
                    </Typography>
                  </Link>
                </CardContent>
                <CardMedia
                  component='img'
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  image={post.image}
                  alt={post.title}
                />
              </Card>
            ))}
        </CardActionArea>
      </Grid>
    </Container>
  );
};

export default SavedPosts;
