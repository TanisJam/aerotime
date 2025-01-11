interface DebugKeycapsProps {
  activeKeycaps: {
    id: number;
    letter: string;
  }[];
  inactiveKeycaps: {
    id: number;
    letter: string;
  }[];
}

export const DebugKeycaps = ({
  activeKeycaps,
  inactiveKeycaps,
}: DebugKeycapsProps) => {
  return (
    <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 text-white">
      <h2>Active keycaps</h2>
      {activeKeycaps
        .sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
        .map((keycap) => (
          <span key={keycap.id} className="px-1">
            {keycap.letter}
          </span>
        ))}
      <h2>Inactive keycaps</h2>
      {inactiveKeycaps
        .sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
        .map((keycap) => (
          <span key={keycap.id} className="px-1">
            {keycap.letter}
          </span>
        ))}
    </div>
  );
};
