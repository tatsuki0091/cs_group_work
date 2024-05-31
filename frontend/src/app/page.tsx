import Top from "../features/top/components/Top";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Top />
      <Footer />
    </main>
  );
}
