import Top from "../features/top/components/Top";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-between">
      <Header />
      <Top />
      <Footer />
    </main>
  );
}
