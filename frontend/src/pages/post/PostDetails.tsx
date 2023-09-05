import * as React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import { Main, MainFeaturePost } from "../../components/Index";
import { getPostById } from "../../redux/fetures/Post/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { post } = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getPostById(id as string));
  }, [dispatch, id]);

  return (
    <Container maxWidth='lg'>
      <MainFeaturePost image={post?.image} title={post?.title} />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main description='Description' post={post.description} />
      </Grid>
    </Container>
  );
};

export default PostDetails;
