import { Github, Linkedin, Mail, Search } from "lucide-react";

const LinkIcon = ({ href, label, children }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
    >
      {children}
      <span>{label}</span>
    </a>
  );
};

export default function Header({
  meta,
  searchTerm,
  onSearchChange,
  tags,
  selectedTags,
  onToggleTag,
  onClearTags,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {meta?.location || ""}
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {meta?.ownerName || "Portfolio"}
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              {meta?.headline || ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LinkIcon href={meta?.links?.github} label="GitHub">
              <Github className="h-4 w-4" />
            </LinkIcon>
            <LinkIcon href={meta?.links?.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </LinkIcon>
            <LinkIcon href={meta?.links?.email} label="Email">
              <Mail className="h-4 w-4" />
            </LinkIcon>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search projects, companies, tags..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex w-full gap-2 overflow-x-auto pb-1">
              {tags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-blue-500 bg-blue-600 text-white shadow"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {selectedTags.length > 0 ?
              <button
                type="button"
                onClick={onClearTags}
                className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:text-blue-700"
              >
                Clear
              </button>
            : null}
          </div>
        </div>
      </div>
    </header>
  );
}
