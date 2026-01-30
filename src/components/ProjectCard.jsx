import { Pin } from "lucide-react";
import { withBase } from "../lib/data";

export default function ProjectCard({ project, onOpen }) {
  const tags = Array.isArray(project.tags) ? project.tags.slice(0, 3) : [];
  const cover = project.cover ? withBase(project.cover) : "";

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
            No cover image
          </div>
        )}
        {project.pinned ? (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow-400/90 px-2 py-1 text-[11px] font-semibold text-slate-900 shadow">
            <Pin className="h-3 w-3" />
            Pinned
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{project.title}</h3>
          <p className="text-xs text-slate-500">
            {project.company} · {project.year}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
