import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { userLoggedIn } from "../user/userSlice";

function UserIdInput() {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("anonymous")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value)
  }
  function handleSubmit() {
    dispatch(userLoggedIn(userId))
  }

  return (
    <div>
      <input type="text" value={userId ?? "user1"} onChange={handleChange} />
      <input type="button" value="Login" onClick={handleSubmit} />
    </div>

  )
}

export default UserIdInput;