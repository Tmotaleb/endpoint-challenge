import React, { useEffect, useState } from "react";
import axios from "axios";
import { isOverdue, formattedDate, sortTodos } from "./utilities";

const API_KEY = "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c";
const API_URL = "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io";

const List = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    try {
      await axios
        .get(`${API_URL}/get`, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        })
        .then((res) => {
          const data = res.data;
          setIsLoading(true);
          setTodoList(data);
        });
    } catch (err) {
      console.log(`Error:${err}`);
      setIsLoading(false);
    }
  };

  const handleChange = (todo) => {
    axios
      .patch(
        `${API_URL}/patch/${todo.id}`,
        { isComplete: !todo.isComplete },
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      )
      .then(() => {
        setTodoList(
          todoList.map((task) =>
            task.id === todo.id
              ? { ...task, isComplete: !task.isComplete }
              : task
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sortTodos(todoList);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="list-container">
      {!isLoading && <div>Loading todos...</div>}
      {isLoading && (
        <ul>
          {todoList.map((item) => {
            return (
              <div
                className={`list-box ${item.isComplete ? "completed" : ""} ${
                  isOverdue(item) ? "overdue" : ""
                }`}
                key={item.id}
              >
                <input
                  type="checkbox"
                  checked={item.isComplete}
                  onChange={() => handleChange(item)}
                />
                <span>{item.description}</span>
                <span className="dates">{formattedDate(item.dueDate)}</span>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default List;
