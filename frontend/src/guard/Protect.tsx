import { useOutlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../redux/app/store";

const Protect = () => {
  const { user } = useAppSelector((state) => state.auth);
  const outlet = useOutlet();

  return user ? outlet : <Navigate to='/login' replace />;
};

export default Protect;
