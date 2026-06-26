import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}