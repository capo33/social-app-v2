import React, { useState } from "react";

// Material UI
import { Box, IconButton, TextField, Typography, Tooltip } from "@mui/material";

// Material UI Icons
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/Delete";

import { IPost } from "../../interfaces/PostInterface";
import { CommentModal } from "../Index";
import { useAppSelector } from "../../redux/app/store";

type CommentInputProps = {
  post: IPost;
  handleComment: (comment: string, id: string) => void;
  handleDeleteComment: (postId: string, commentId: string) => void;
};

const CommentInput = ({
  post,
  handleComment,
  handleDeleteComment,
}: CommentInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);

  console.log("user", user);
  console.log("post", post);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ ml: 2, width: "100%" }}
          variant='standard'
          placeholder='Add a comment...'
          inputProps={{ "aria-label": "Add a comment..." }}
          value={inputValue}
          onChange={handleChange}
        />
        {!user ? (
          <Tooltip title='Please loging to comment on this post'>
            <IconButton>
              <SendIcon sx={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            type='button'
            sx={{ p: "10px" }}
            aria-label='search'
            onClick={() => {
              handleComment(inputValue, post._id);
              setInputValue("");
            }}
          >
            <SendIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Box>

      <CommentModal post={post} handleDeleteComment={handleDeleteComment} />

      {/* Show first two comments */}
      {post?.comments?.length > 0 && (
        <>
          {post?.comments?.slice(0, 2)?.map((comment: any) => (
            <Box
              key={comment._id}
              sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant='body1' color='text.secondary' sx={{ ml: 2 }}>
                <span style={{ fontWeight: "bolder" }}>
                  {comment?.postedBy?.username}{" "}
                </span>
                {comment.comment}
              </Typography>
              {/* here i show the delete button depending on postedBy */}
              {comment?.postedBy?._id === user?._id ? (
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDeleteComment(post._id, comment._id)}
                >
                  <DeleteForeverIcon color='error' fontSize='small' />
                </IconButton>
              ) : null}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default CommentInput;
