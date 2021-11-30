import Axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  const [date, setDate] = useState();
  const [task, setTask] = useState();
  const [todos, setTodos] = useState([]);

  const styleBtn = (color) => {
    return `mt-2 py-0.5 px-2.5 ${color} text-white rounded-lg hover:opacity-80`;
  };

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
      .then((res) => {
        setTodos([...todos, { _id: res.data._id, date: date, task: task }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // id를 click할 때 가져온 후 server로 넘기기
  const handleUpdate = (id) => {
    const newTask = prompt('Enter the updated task');

    Axios.put('http://localhost:3003/update', {
      id: id,
      task: newTask,
    }).then(() => {
      setTodos(
        todos.map((cur) => {
          return cur._id === id
            ? { _id: id, date: cur.date, task: newTask }
            : cur;
        })
      );
    });
  };

  // Delete
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3003/delete/${id}`).then(() => {
      setTodos(
        todos.filter((cur) => {
          return cur._id !== id;
        })
      );
    });
  };

  // todos 서버 통해 DB에서 가져오기
  useEffect(() => {
    Axios.get('http://localhost:3003/read')
      .then((response) => {
        setTodos(response.data);
      })
      .catch(() => {
        alert('ERROR OCCURRED');
      });
  }, []);

  return (
    <div className="container mx-auto mt-16 md:mt-30 lg:mt-40">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-center text-4xl font-semibold mr-2 dark:text-white">
          <span className="font-bold text-5xl">G</span>et{' '}
          <span className="font-bold text-5xl">T</span>hings{' '}
          <span className="font-bold text-5xl">D</span>one
        </h1>
        <img className="w-16" src="./img/todo-logo.png" alt="logo" />
      </div>
      <div className="flex flex-col items-center mt-10 lg:flex-row lg:justify-center">
        <div className="w-5/6 mb-4 bg-white rounded-lg shadow-md lg:mr-6 lg:w-1/3 p-4 h-60">
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
            <button className={styleBtn('bg-primary')}>Add</button>
          </form>
        </div>
        <div className="w-5/6 lg:w-1/3">
          <ul>
            {todos.map((todo) => {
              return (
                <li
                  key={todo._id}
                  className="mb-4 shadow py-2 pl-4 rounded-md cursor-pointer hover:shadow-xl transition flex justify-between items-center dark:bg-white"
                >
                  <div>
                    <h2>{todo.date}</h2>
                    <h2 className="text-xl">{todo.task}</h2>
                  </div>
                  <div className="mr-4">
                    <button
                      onClick={() => {
                        handleUpdate(todo._id);
                      }}
                      className={styleBtn('bg-blue-500')}
                    >
                      update
                    </button>
                    <br />
                    <button
                      onClick={() => {
                        handleDelete(todo._id);
                      }}
                      className={styleBtn('bg-red-500')}
                    >
                      delete
                    </button>
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
