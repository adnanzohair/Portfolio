import Hero from '../sections/Hero';
import Introduction from '../sections/Introduction';
import About from '../sections/About';
import Work from '../sections/Work';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Services from '../sections/Services';
import Performance from '../sections/Performance';
import Engineering from '../sections/Engineering';
import Contact from '../sections/Contact';
import HowIWork from '../sections/HowIWork';
import BeyondCode from '../sections/BeyondCode';

export default function HomePage({ setCursorVariant }) {
  const sharedProps = { setCursorVariant };

  return (
    <main>
      <Hero {...sharedProps} />
      <Introduction />
      <About {...sharedProps} />
      <Work {...sharedProps} />
      <Experience {...sharedProps} />
      <Skills {...sharedProps} />
      <Services {...sharedProps} />
      <Performance {...sharedProps} />
      <Engineering {...sharedProps} />
      <HowIWork />
      <BeyondCode />
      <Contact {...sharedProps} />
    </main>
  );
}
