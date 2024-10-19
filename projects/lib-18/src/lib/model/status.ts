export interface Status {
  SelectedRow: number;
  PageIndex: number;
  PageSize: number;
  PageSizeOptions: number[];
  SortActive: string;
  SortDirection: string;
}
export const STATUSDEFAULT: Status = {
  SelectedRow: 0,
  PageIndex: 0,
  PageSize: 10,
  PageSizeOptions: [5, 10, 20],
  SortActive: 'updatedAt',
  SortDirection: 'desc',
};
