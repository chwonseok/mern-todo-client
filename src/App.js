import Axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  const [date, setDate] = useState();
  const [task, setTask] = useState();
  const [todos, setTodos] = useState([]);

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  // new todo 서버 통해 DB에 저장하기
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3003/add', {
      date: date,
      task: task,
    })
      .then(() => {
        setTodos([...todos, { date: date, task: task }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // todos 서버 통해 DB에서 가져오기
  useEffect(() => {
    Axios.get('http://localhost:3003/read')
      .then((response) => {
        console.log(response);
        setTodos(response.data);
      })
      .catch(() => {
        alert('ERROR OCCURRED');
      });
  }, []);

  return (
    <div className="container mx-auto w-2/3 md:w-5/6 sm:w-full mt-40">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-center text-4xl font-semibold mr-2 dark:text-white">
          <span className="font-bold text-5xl">G</span>et{' '}
          <span className="font-bold text-5xl">T</span>hings{' '}
          <span className="font-bold text-5xl">D</span>one
        </h1>
        <img className="w-16" src="./img/todo-logo.png" alt="logo" />
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="mr-6 bg-white rounded-lg shadow-md w-1/3 p-4">
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="date">Date</label>
              <div className="mb-4">
                <input
                  id="date"
                  onChange={handleDate}
                  type="date"
                  className="w-4/5 focus:ring-1 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="task">Task</label>
              <div>
                <input
                  id="task"
                  onChange={handleTask}
                  type="text"
                  placeholder="task to do"
                  className="w-full focus:ring-1 rounded-md"
                  required
                />
              </div>
            </div>
            <button className="mt-4 py-0.5 px-2.5 bg-primary text-white rounded-lg hover:opacity-80">
              Add
            </button>
          </form>
        </div>
        <div className="w-1/3">
          <ul>
            {todos.map((todo) => {
              return (
                <li
                  key={todo._id}
                  className="mb-4 shadow py-2 pl-4 rounded-md cursor-pointer hover:shadow-xl transition"
                >
                  <div className="dark:text-white">
                    <h2>{todo.date}</h2>
                    <h2 className="text-xl">{todo.task}</h2>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
