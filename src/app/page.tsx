import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Problems from "@/components/Problems";
import Solutions from "@/components/Solutions";
import ProductCatalog from "@/components/ProductCatalog";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <Benefits />
      <Problems />
      <Solutions />
      <ProductCatalog />
      <FinalCTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
