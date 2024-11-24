export interface Task {
  _id: string; // MongoDB ObjectId
  title: string;
  description: string;
  priority: string;
  status: string;
  user?: string; // Opcional si no es necesario en el frontend
  createDate?: string; // Opcional si lo necesitas
}