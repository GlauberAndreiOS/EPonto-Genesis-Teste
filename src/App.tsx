import Header from "./components/global/header/Header";
import Create from "./pages/Lancamento/Escala/Create";
import { ThemeProvider } from "./Providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Header />
      <Create />
    </ThemeProvider>
  )
}