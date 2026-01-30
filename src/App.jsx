import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ProjectGrid from "./components/ProjectGrid.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Lightbox from "./components/Lightbox.jsx";
import LoadingState from "./components/LoadingState.jsx";
import EmptyState from "./components/EmptyState.jsx";
import { fetchJson, withBase } from "./lib/data.js";

const indexPath = withBase("docs/data/index.json");

const matchesSearch = (project, query) => {
  if (!query) return true;
  const haystack = [project.title, project.company, ...(project.tags || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const matchesTags = (project, selectedTags) => {
  if (selectedTags.length === 0) return true;
  const projectTags = project.tags || [];
  return selectedTags.every((tag) => projectTags.includes(tag));
};

const sortProjects = (a, b) => {
  if (Boolean(b.pinned) !== Boolean(a.pinned)) {
    return b.pinned ? 1 : -1;
  }
  if ((b.year || 0) !== (a.year || 0)) {
    return (b.year || 0) - (a.year || 0);
  }
  return String(a.title).localeCompare(String(b.title));
};

export default function App() {
  const [meta, setMeta] = useState(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailStatus, setDetailStatus] = useState("idle");
  const [detailError, setDetailError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        setStatus("loading");
        setError("");
        const data = await fetchJson(indexPath);
        if (!data?.meta || !Array.isArray(data.projects)) {
          throw new Error("Invalid data schema");
        }
        setMeta(data.meta);
        setProjects(data.projects);
        setStatus("ready");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setStatus("error");
      }
    };

    loadIndex();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const loadDetail = async () => {
      try {
        setDetailStatus("loading");
        setDetailError("");
        setDetail(null);
        const path = activeProject.path || `projects/${activeProject.id}`;
        const detailPath = withBase(`docs/${path}/project.json`);
        const data = await fetchJson(detailPath);
        setDetail(data);
        setDetailStatus("ready");
      } catch (err) {
        setDetailError(err instanceof Error ? err.message : "Failed to load detail");
        setDetailStatus("error");
      }
    };

    loadDetail();
  }, [activeProject]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((project) => {
      (project.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return projects
      .filter((project) => matchesSearch(project, query))
      .filter((project) => matchesTags(project, selectedTags))
      .sort(sortProjects);
  }, [projects, searchTerm, selectedTags]);

  const openProject = (project) => {
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
    setDetail(null);
    setDetailStatus("idle");
    setDetailError("");
    setLightboxOpen(false);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const gallery = Array.isArray(detail?.gallery) ? detail.gallery : [];

  const goPrev = () => {
    if (gallery.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goNext = () => {
    if (gallery.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  };

  return (
    <div className="min-h-screen">
      <Header
        meta={meta}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tags={allTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={() => setSelectedTags([])}
      />
      {status === "loading" ? (
        <div className="px-4 py-12 sm:px-6">
          <LoadingState message="Loading portfolio…" />
        </div>
      ) : null}
      {status === "error" ? (
        <div className="px-4 py-12 sm:px-6">
          <EmptyState
            title="Unable to load projects"
            description="Check your JSON data in public/docs and try again."
          />
        </div>
      ) : null}
      {status === "ready" ? (
        filteredProjects.length > 0 ? (
          <ProjectGrid projects={filteredProjects} onOpen={openProject} />
        ) : (
          <div className="px-4 py-12 sm:px-6">
            <EmptyState
              title="No matches"
              description="Try clearing filters or changing your search terms."
            />
          </div>
        )
      ) : null}
      <ProjectModal
        isOpen={Boolean(activeProject)}
        onClose={closeProject}
        summary={activeProject}
        detail={detail}
        loading={detailStatus === "loading"}
        error={detailStatus === "error"}
        onOpenLightbox={openLightbox}
      />
      <Lightbox
        isOpen={lightboxOpen}
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
