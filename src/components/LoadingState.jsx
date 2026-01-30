export default function LoadingState({ message }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-slate-600 shadow-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
