import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Lock,
  X,
} from "lucide-react";
import { withBase } from "../lib/data";

const portalRoot = document.body;

export default function ProjectModal({
  isOpen,
  onClose,
  summary,
  detail,
  loading,
  error,
  onOpenLightbox,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const safeDetail = detail || {};
  const tags = Array.isArray(safeDetail.tags) ? safeDetail.tags : summary?.tags || [];
  const description = Array.isArray(safeDetail.description) ? safeDetail.description : [];
  const responsibilities = Array.isArray(safeDetail.responsibilities)
    ? safeDetail.responsibilities
    : [];
  const highlights = Array.isArray(safeDetail.highlights) ? safeDetail.highlights : [];
  const links = Array.isArray(safeDetail.links) ? safeDetail.links : [];
  const gallery = Array.isArray(safeDetail.gallery) ? safeDetail.gallery : [];
  const nda = safeDetail.nda?.isNDA;
  const ndaNote = safeDetail.nda?.note;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/50 backdrop-blur-sm"
        aria-label="Close overlay"
      />
      <div className="relative z-10 mx-auto w-[min(95vw,980px)] max-h-[90vh] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{summary?.title}</h2>
            <p className="text-sm text-slate-500">{summary?.company}</p>
          </div>
          <div className="flex items-center gap-2">
            {nda ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <Lock className="h-3 w-3" />
                NDA
              </span>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-slate-500">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
              <p className="text-sm font-medium">Loading project…</p>
            </div>
          ) : null}
          {error ? (
            <div className="px-6 py-12 text-center text-sm text-red-500">
              Failed to load project details. Try closing and reopening.
            </div>
          ) : null}
          {!loading && !error ? (
            <div className="grid gap-8 px-6 py-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Role</p>
                  <p className="text-base font-medium text-slate-900">
                    {safeDetail.role || ""}
                  </p>
                  <p className="text-sm text-slate-500">{safeDetail.period || ""}</p>
                </div>
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                {description.length > 0 ? (
                  <div className="space-y-3 text-sm text-slate-600">
                    {description.map((paragraph, index) => (
                      <p key={`${paragraph}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
                {responsibilities.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Responsibilities</h3>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                      {responsibilities.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {highlights.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Highlights</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {highlights.map((highlight, index) => (
                        <div
                          key={`${highlight.label}-${index}`}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                        >
                          <p className="text-xs text-slate-500">{highlight.label}</p>
                          <p className="text-sm font-semibold text-slate-900">{highlight.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {links.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Links</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {links.map((link, index) => (
                        <a
                          key={`${link.url}-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {link.label || link.type}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div>
                {nda ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                    <Lock className="h-6 w-6 text-red-500" />
                    <p className="font-semibold text-slate-700">Protected / Confidential</p>
                    {ndaNote ? <p>{ndaNote}</p> : null}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {gallery.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-xs text-slate-500">
                        No gallery images.
                      </div>
                    ) : (
                      gallery.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => onOpenLightbox(index)}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                        >
                          <img
                            src={withBase(image)}
                            alt={`${summary?.title} screenshot ${index + 1}`}
                            className="h-32 w-full object-cover transition duration-200 group-hover:scale-105"
                            loading="lazy"
                          />
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    portalRoot
  );
}
