import { MotionConfig } from 'framer-motion';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { ResearchInterests } from './components/research/ResearchInterests';
import { Skills } from './components/Skills';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip text-ink">
        <Navbar />
        <main>
          <Hero />
          <About />
          <ResearchInterests />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
