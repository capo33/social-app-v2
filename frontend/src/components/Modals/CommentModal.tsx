import { useState } from "react";

// Material UI
import { Box, Typography, Modal, IconButton } from "@mui/material";
// Material UI Icons
import DeleteForeverIcon from "@mui/icons-material/Delete";

import { IPost } from "../../interfaces/PostInterface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CommentModalProps = {
  post: IPost;
  handleDeleteComment: (postId: string, commentId: string) => void;
};

export default function CommentModal({
  post,
  handleDeleteComment,
}: CommentModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box component={"div"}>
      {/* Comments Modal if there is more then two comments */}
      {post?.comments.length > 2 && (
        <>
          <Box
            onClick={handleOpen}
            sx={{ ml: 2, cursor: "pointer" }}
            color='#2196f3'
          >
            View all {post?.comments.length} comments...
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              {post.comments.map((comment: any) => (
                <Box
                  key={comment._id}
                  sx={{
                    p: "5px 4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant='h6'
                    color='text.secondary'
                    sx={{ ml: 2 }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      {comment?.postedBy?.username}{" "}
                    </span>
                    {comment.comment}
                  </Typography>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteComment(post._id, comment._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}
