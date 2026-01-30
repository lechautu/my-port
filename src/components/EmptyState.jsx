export default function EmptyState({ title, description }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center text-slate-600 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}
