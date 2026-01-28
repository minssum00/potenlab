import svgPaths from "./svg-okipv59kgs";

function Logo() {
  return (
    <div className="absolute inset-[11.56%_24.38%]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 205 308">
        <g id="Logo">
          <path d={svgPaths.p2e3eacf2} fill="var(--fill-0, #0ACF83)" id="Vector" />
          <path d={svgPaths.p1b312500} fill="var(--fill-0, #1ABCFE)" id="Vector_2" />
          <path d={svgPaths.p15225200} fill="var(--fill-0, #A259FF)" id="Vector_3" />
          <path d={svgPaths.p4caee80} fill="var(--fill-0, #FF7262)" id="Vector_4" />
          <path d={svgPaths.p28537480} fill="var(--fill-0, #F24E1E)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

export default function FigmaLogoFullColor() {
  return (
    <div className="relative size-full" data-name="Figma Logo Full Color">
      <Logo />
    </div>
  );
}