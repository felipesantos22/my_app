import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-500 min-h-screen p-5">
      <div className="bg-gray-100 h-full w-full p-10 rounded-lg flex flex-col items-center justify-center gap-5">
        <h1 className="text-black text-4xl font-bold">Lista de Tarefas</h1>
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          className="bg-white h-10 w-full rounded-md px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
