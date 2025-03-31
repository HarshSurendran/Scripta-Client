import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false} gutter={8} />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App