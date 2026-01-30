import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onOpen }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
