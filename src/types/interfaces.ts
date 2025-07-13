// File: src/types/interfaces.ts
export interface IState {
  data: IItem[];
  loading: boolean;
  error: Error | null;
  search: string;
}
export interface IData {
  items: IItem[];
}
export interface IItem {
  name: string;
  url: string;
}
// The component receives everything it needs for display through props.
export interface IProps {
  loading: boolean;
  error: Error | null;
  filteredData: IItem[];
}
export interface ISearchProps {
  initial: string;
  onSearch: (term: string) => void;
}
export interface ISearchState {
  value: string;
}
export interface IMainState {
  throwError: boolean;
}
