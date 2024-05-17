const BASE_URL = "https://664781f52bb946cf2f9dfd2a.mockapi.io/users/v1/users";

export const getUsersApi = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
};

export const addUserApi = async (user) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to add user");
  }
};

export const deleteUserApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
};

export const deleteMultipleUsersApi = async (selectedRows) => {
  for (const selectedRow of selectedRows) {
    const res = await fetch(`${BASE_URL}/${selectedRow.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
  }
};

export const updateUserApi = async (user) => {
  const res = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to update user");
  }
};
