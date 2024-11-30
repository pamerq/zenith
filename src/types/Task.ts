export interface Task {
  _id: string;
  title: string;
  priority: string;
  description: string;
  status: string;
  createDate: Date;
  deadline: Date;
}

export interface TaskList {
  tasks: Task[];
}