export interface ITask {
  id: string;
  name: string;
  description?: string;
  concluded: boolean;
  create_date: string;
  hour_create?: string;
  edit_date?: string;
  edit_hour?: string;
}
