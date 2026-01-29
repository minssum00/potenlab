interface TechStackIconProps {
  tech: string;
  onClick: () => void;
}

export function TechStackIcon({ tech, onClick }: TechStackIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#E6F3FF] text-[#0079FF] border border-[#0079FF]/20 hover:bg-[#0079FF] hover:text-white hover:border-[#0079FF] transition-colors"
      title={tech}
    >
      {tech}
    </button>
  );
}
