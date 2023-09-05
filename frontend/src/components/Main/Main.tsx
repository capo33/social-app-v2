import * as React from "react";
import Divider from "@mui/material/Divider";
import { Grid, Typography, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  getSavedPosts,
  savePost,
  unsavePost,
} from "../../redux/fetures/Post/postSlice";

import { useAppDispatch, useAppSelector } from "../../redux/app/store";

interface MainProps {
  post: string;
  description: string;
}

export default function Main(props: MainProps) {
  const { post: p, savedPosts } = useAppSelector((state) => state.posts);

  const { user } = useAppSelector((state) => state.auth);
  const { user: me } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const postIds = savedPosts?.map((post) => post._id);
 
  React.useEffect(() => {
    dispatch(getSavedPosts({ userId: me?._id as string, token }));
  }, [dispatch, me, token]);

  // Save Recipe
  const handleSaveRecipe = (postId: string) => {
    dispatch(
      savePost({
        postId,
        userId: me?._id as string,
        token,
      })
    );
  };

  // Unsave Recipe
  const handleUnsaveRecipe = (postId: string) => {
    dispatch(
      unsavePost({
        postId,
        userId: me?._id as string,
        token,
      })
    );
  };

  const { post, description } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {description}
        {postIds?.includes(p?._id as any) ? (
          <IconButton onClick={() => handleUnsaveRecipe(p?._id!)}>
            <BookmarkIcon sx={{ color: "black" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleSaveRecipe(p?._id!)}>
            <BookmarkBorderIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Typography>
      <Divider />
      <Typography variant='h6' gutterBottom>
        {post}
      </Typography>
    </Grid>
  );
}
