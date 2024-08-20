/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Control {
  Feature: string;
  SelectedRow: number;
  PageIndex: number;
  PageSize: number;
  PageSizeOptions: number[];
  SortActive: string;
  SortDirection: string;
  Data: any[];
}
export const DEFAULTCONTROL: Control = {
  Feature: '',
  SelectedRow: 0,
  PageIndex: 0,
  PageSize: 10,
  PageSizeOptions: [5, 10, 20],
  SortActive: 'updatedAt',
  SortDirection: 'desc',
  Data: [],
};
