export interface Column {
  def: string;
  name: string;
}
const TASK_COLUMN: Column[] = [
  { def: 'id', name: 'No' },
  { def: 'title', name: 'Title' },
  // { def: 'createdAt', name: '作成日' },
  { def: 'updatedAt', name: '更新日' },
  { def: 'delete', name: '削除' },
];
export const TASKCOLUMN = {
  data: TASK_COLUMN,
};
