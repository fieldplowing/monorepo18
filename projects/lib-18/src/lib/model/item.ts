export interface Item {
  _id: string;
  id: number;
  status: string;
  category: string;
  title: string;
  content: string;
  accessCount: number;
  updateCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface TaskItem {
  id: number;
  status: string;
  category: string;
  title: string;
  content: string;
  accessCount: number;
  updateCount: number;
  createdAt: string;
  updatedAt: string;
}
