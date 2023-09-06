import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

// Material UI
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Stack,
  Chip,
  Alert,
  Tooltip,
} from "@mui/material";

// Material UI Icons
import { red } from "@mui/material/colors";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  commentPost,
  deleteCommentPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../../redux/fetures/Post/postSlice";
import { formatDate } from "../../utils/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { CommentInput } from "../../components/Index";

export default function Home() {
  const { posts, savedPosts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const postIds = savedPosts.map((post) => post._id);
  console.log(postIds);

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Like post
  const handleLike = async (id: string) => {
    dispatch(likePost({ postId: id, token }));
  };

  // Unlike post
  const handleUnlike = async (id: string) => {
    dispatch(unlikePost({ postId: id, token }));
  };

  // Comment post
  const handleComment = (comment: string, id: string) => {
    dispatch(commentPost({ comment, postId: id, token }));
  };

  // Delete comment
  const handleDeleteComment = (postId: string, commentId: string) => {
    dispatch(deleteCommentPost({ postId, commentId, token }));
  };

  return (
    <Container maxWidth='lg' sx={{ my: 10 }}>
      <Box>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='text.primary'
          gutterBottom
        >
          Social Network <PublicIcon sx={{ fontSize: 40 }} />
        </Typography>
      </Box>
      {posts.length === 0 && (
        <Alert variant='outlined' severity='info'>
          No posts yet
        </Alert>
      )}
      <Grid container spacing={4}>
        {posts &&
          posts.map((post) => {
            const postId = post?._id;

            return (
              <Grid item key={post?._id} xs={12} sm={6}>
                <Card>
                  {/* Navigate to my own profile or to the other user profile */}
                  <CardHeader
                    avatar={
                      <Link
                        to={
                          post?.postedBy?._id !== user?._id
                            ? `/profile/${post?.postedBy?._id}`
                            : "/profile"
                        }
                      >
                        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                          {post?.postedBy?.image}
                        </Avatar>
                      </Link>
                    }
                    action={
                      post?.postedBy?._id === user?._id && (
                        <IconButton
                          onClick={() =>
                            dispatch(deletePost({ postId, token, toast }))
                          }
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      )
                    }
                    title={`by@ ${post?.postedBy?.username}`}
                    subheader={formatDate(post?.createdAt)}
                  />

                  {/* Image */}
                  <Link to={`/${post?.title}/${post?._id}`}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={post?.image}
                      alt={post?.title}
                    />
                  </Link>
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {post?.description}
                    </Typography>
                  </CardContent>

                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={4}
                  >
                    {/* Like & Unlike */}
                    <CardActions disableSpacing>
                      {!user ? (
                        <Tooltip title='Please loging to like the post'>
                          <IconButton>
                            <FavoriteBorderIcon sx={{ color: "black" }} />
                          </IconButton>
                        </Tooltip>
                      ) : post?.likes?.includes(user?._id!) ? (
                        <IconButton
                          aria-label='unlike'
                          onClick={() => handleUnlike(post?._id!)}
                        >
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label='like'
                          onClick={() => handleLike(post?._id!)}
                        >
                          <FavoriteBorderIcon sx={{ color: "black" }} />
                        </IconButton>
                      )}
                    </CardActions>
                    <CardActions disableSpacing>
                      {postIds.includes(post?._id!) ? (
                        <IconButton aria-label='saved'>
                          <Chip
                            label='Saved'
                            variant='outlined'
                            color='warning'
                          />
                        </IconButton>
                      ) : (
                        <IconButton aria-label='unsaved'>
                          <Chip label='Unsaved' variant='outlined' />
                        </IconButton>
                      )}
                    </CardActions>
                  </Stack>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ ml: 2 }}
                  >
                    {post?.likes?.length}{" "}
                    {post?.likes?.length > 1 ? "likes" : "like"}
                  </Typography>

                  {/* Add Comments */}
                  <CommentInput
                    post={post}
                    handleComment={handleComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
