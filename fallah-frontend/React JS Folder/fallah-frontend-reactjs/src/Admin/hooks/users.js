import axios from "axios";

export const deleteUser = async (id) => {
  await axios
    .delete(`http://localhost:3000/admin/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: {
        id: id,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
