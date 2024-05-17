import DataTable from "./components/DataTable";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GlobalProvider from "./context/GlobalContext";

export default function App() {
  [];
  return (
    <GlobalProvider>
      <Navbar />
      <SearchBar />
      <DataTable />
    </GlobalProvider>
  );
}
