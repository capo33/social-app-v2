import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getNotifications } from "../../redux/fetures/User/userSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

const Notifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const { user: me } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = me?.token as string;

  useEffect(() => {
    dispatch(getNotifications(token as string));
  }, [dispatch, token]);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant='h4'>Notifications</Typography>
      {user?.notifications?.length === 0 && (
        <Alert severity='success'>You have no notifications</Alert>
      )}
      {user?.notifications?.length !== 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {/* {user?.notifications?.map((notification) => (
                  <TableCell
                    key={notification._id}
                    align={"left"}
                    style={{ minWidth: 170 }}
                  >
                    {notification.title}
                  </TableCell>
                ))} */}
                  <TableCell
                    align={"left"}
                    style={{ minWidth: 170, textAlign: "center" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.notifications?.map((notification) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={notification._id}
                    >
                      <TableCell align={"left"} style={{ minWidth: 170 }}>
                        <Link to={`/profile/${notification._id}`}>
                          {notification.description}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Notifications;
