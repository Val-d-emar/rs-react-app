// File: src/types/interfaces.ts
export interface IState {
  data: Idata[];
  loading: boolean;
  error: Error | null;
  search: string;
}
interface Idata {
  name: string;
  url: string;
}
// The component receives everything it needs for display through props.
export interface IProps {
  loading: boolean;
  error: Error | null;
  filteredData: Idata[];
}
export interface ISearchProps {
  initial: string;
  onSearch: (term: string) => void;
}
export interface ISearchState {
  value: string;
}
