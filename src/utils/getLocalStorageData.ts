import { userT } from "../redux/slices/userReducer";

export default function getLocalStorageData() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as userT;

  return { currentUser };
}
