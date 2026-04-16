const BASE_URL = "https://crudmodel-production.up.railway.app/tasks/";

export async function getTasks() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  return res.json();
}

export async function createTask(title: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}

export async function deleteTask(id: number) {
  await fetch(`${BASE_URL}${id}`, {
    method: "DELETE",
  });
}

export async function updateTask(id: number, data: any) {
  const res = await fetch(`${BASE_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
