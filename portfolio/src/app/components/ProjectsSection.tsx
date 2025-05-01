import styles from './ProjectsSection.module.css';

const ProjectsSection = () => (
  <section id="projects" className={styles.section}>
    <h2 className={styles.title}>Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
      {/* Project cards */}
      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
        <h3 className="text-xl font-bold mb-2">Project Title</h3>
        <p className="text-gray-300">Project description...</p>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
