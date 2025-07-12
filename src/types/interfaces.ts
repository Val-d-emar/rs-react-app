// types/interfaces.ts - define types for the data from the API.
export interface IState {
  data: Idata[];
  filteredData: Idata[];
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
