export default function Loader({ fullscreen = false, size = 'md' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const spinner = (
    <div className={`${sizes[size]} rounded-full border-2 border-sky-400/20 border-t-sky-400 spinner`} />
  );

  if (fullscreen) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
}