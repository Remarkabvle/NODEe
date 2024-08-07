import React, { useState } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../context/api/userApi";
import "./users.scss";

const Users = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const limit = 3;
  const { data, isFetching } = useGetUsersQuery();
  const [handleDelete] = useDeleteUserMutation();

  if (isFetching) return <div>Loading...</div>;

  const handleDeleteFunc = (id) => {
    if (window.confirm("O'chirmoqchimisiz")) {
      handleDelete(id).then(() => {
        setPage(1);
      });
    }
  };

  let totalPages = Math.ceil(data?.total / limit);

  return (
    <div className="user-list">
      <h2 className="user-list__title">Users</h2>
      <div className="user-list__cards">
        {data?.payload?.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-card__img">
              <img src={user.url} alt={user.fname} className="user-card__avatar" />
            </div>
            <div className="user-card__info">
              <h3 className="user-card__name">{user.fname}</h3>
              <p className="user-card__username">@{user.username}</p>
              <p className="user-card__age">Age: {user.age}</p>
              <p className={`user-card__status ${user.isActive ? "active" : "inactive"}`}>
                Status: {user.isActive ? "Active" : "Inactive"}
              </p>
              <div className="user-card__btns">
                <button>edit</button>
                <button onClick={() => handleDeleteFunc(user._id)}>delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
