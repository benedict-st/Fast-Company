import React, { useState } from "react";
import api from "../api";
import ListqualitiesItem from "./ListqualitiesItem";
import sklonenie from "../utils/sklonenie";
export default function Users() {
  console.log(api.users.fetchAll());
  const [users, setusers] = useState(api.users.fetchAll());
  const [number, setnumber] = useState(api.users.fetchAll().length);
  const handleDelete = (userId) => {
    //console.log(userId);
    setusers((prevState) => prevState.filter((users) => users._id !== userId));
    handlePhrace(users.length);
  };
  const handlePhrace = (number) => {
    setnumber(number - 1);
  };
  const getBadgClasses = (number) => {
    let classes = "badge m-2 bg-";
    let classDisable = "";
    if (number === 0) {
      classes += "danger";
    } else {
      classes += "info";
    }

    return classes;
  };

  const getTableClasses = (number) => {
    let classTable = "";
    if (number === 0) {
      classTable = "d-none";
    } else {
      classTable = "thead-dark";
    }

    return classTable;
  };

  const renderHeader = (number) => {
    return number === 0 ? (
      <span className={getBadgClasses(number)}>Никто с тобой не тусанет</span>
    ) : (
      <span className={getBadgClasses(number)}>
        {number} {sklonenie(number, ["человек", "человека", "человек"])} тусанет
        с тобой сегодня
      </span>
    );
  };
  return (
    <div>
      <h2>{renderHeader(number)}</h2>

      <table class="table">
        <thead className={getTableClasses(number)}>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        {users.map((item) => (
          <tr key={item._id}>
            {<td>{item.name}</td>}
            {
              <td>
                <ListqualitiesItem qualities={item.qualities} />
              </td>
            }
            {<td>{item.profession.name}</td>}
            {<td>{item.completedMeetings}</td>}
            {<td>{item.rate}/5</td>}
            {
              <td
                className="btn btn-danger"
                onClick={() => handleDelete(item._id)}
              >
                delete
              </td>
            }
          </tr>
        ))}
      </table>
    </div>
  );
}
