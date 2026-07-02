import { useCallback, useMemo, useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import Boot from './components/Boot.jsx';
import CyberBackground from './components/CyberBackground.jsx';
import Hud from './components/Hud.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import CompetitiveProgramming from './components/CompetitiveProgramming.jsx';
import Awards from './components/Awards.jsx';
import GithubActivity from './components/GithubActivity.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BehaviourConsole from './components/BehaviourConsole.jsx';
import BackToTop from './components/BackToTop.jsx';
import ConsoleCommands from './components/ConsoleCommands.jsx';
import { useBehaviour } from './hooks/useBehaviour.js';
import { useScrollSpy } from './hooks/useScrollSpy.js';

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'code', 'awards', 'github', 'contact'];

export default function App() {
  const [launched, setLaunched] = useState(false);
  const [booted, setBooted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const behaviour = useBehaviour(SECTION_IDS.length);
  const onSeen = useCallback((id) => behaviour.see(id), [behaviour]);
  const active = useScrollSpy(useMemo(() => SECTION_IDS, []), onSeen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <CyberBackground />
      <div className="grid-overlay" />
      <div className="scanline" />

      {!launched && <LandingPage onLaunch={() => setLaunched(true)} />}
      {launched && !booted && <Boot onDone={() => setBooted(true)} />}

      <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <header className={`sys-header ${scrolled ? 'scrolled' : ''}`}>
          <Hud />
          <Navbar active={active} scrolled={scrolled} />
        </header>

      <main>
        <Hero booted={booted} />
        <Stats />
        <About />
        <Experience />
        <Projects onInteract={behaviour.bump} />
        <Skills />
        <CompetitiveProgramming />
        <Awards />
        <GithubActivity />
        <Contact behaviour={behaviour} />
      </main>

      <Footer />
      <BehaviourConsole snap={behaviour.snap} total={behaviour.totalSections} />
      <BackToTop />
      <ConsoleCommands onCommand={behaviour.bump} />
      </div>
    </>
  );
}
