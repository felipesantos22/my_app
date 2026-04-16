"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleAddTask() {
    if (!newTask) return;

    const task = await createTask(newTask);
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleToggle(task: Task) {
    const updated = await updateTask(task.id, {
      ...task,
      isDone: !task.isDone,
    });

    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  }

  return (
    <div className="bg-gray-500 min-h-screen p-5">
      <div className="bg-gray-100 h-full w-full p-10 rounded-lg flex flex-col items-center gap-5">
        <h1 className="text-black text-4xl font-bold">Lista de Tarefas</h1>

        {/* Input */}
        <div className="w-full flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="bg-white h-10 w-full rounded-md px-3 text-gray-800"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Lista */}
        <div className="w-full">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-3 rounded-md mb-2 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => handleToggle(task)}
                />

                <span
                  className={`text-black ${
                    task.isDone ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
