import { useState } from "react";

const BoundingBox = ({ imageSrc, data }) => {
  const [hoveredBox, setHoveredBox] = useState(null); // Track the hovered box

  if (data?.length === 0) {
    return (
      <>
        <div className="bg-[#E9EEF0] flex flex-wrap items-center justify-center h-4/5 w-full">
          <img src="/default.jpg" className="block object-none" />
          <p className="absolute top-0 p-2 text-gray-500 text-2xl font-medium">
            Nao foi encontrado celebridade(s)
          </p>
        </div>
      </>
    );
  }

  const extractFaces = (data) => {
    if (!data) return [];

    return [
      ...(data?.celebrityFaces || []).map((face) => ({
        type: "celebrity",
        name: face.name,
        matchConfidence: face.matchConfidence,
        gender: face.knownGender?.type?.value || "Unknown",
        emotions: face.face.emotions,
        boundingBox: face.face.boundingBox,
      })),
      ...(data?.unrecognizedFaces || []).map((face) => ({
        type: "unrecognized",
        name: "Unknown",
        matchConfidence: null,
        gender: "Unknown",
        emotions: face.emotions,
        boundingBox: face.boundingBox,
      })),
    ];
  };

  // Mapper para celebrityFaces e unrecognizedFaces
  const allFaces = extractFaces(data);

  return (
    <div className="relative inline-block overflow-visible">
      {/* Image */}
      <img src={imageSrc} className="block rounded-lg" />
      {/* END Image */}

      {/* Bounding Boxes */}
      {allFaces.map((face, index) => {
        const { boundingBox, name, gender, matchConfidence, emotions } = face;
        const dominantEmotion = emotions[0]?.type?.value || "Unknown";

        return (
          <div
            key={index}
            className="absolute border-2 border-red-500 rounded-md"
            style={{
              top: `${boundingBox.top * 100}%`,
              left: `${boundingBox.left * 100}%`,
              width: `${boundingBox.width * 100}%`,
              height: `${boundingBox.height * 100}%`,
            }}
            onMouseEnter={() => setHoveredBox(index)}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Tooltip */}
            {hoveredBox === index && (
              <div className="absolute top-0 left-0 z-10 bg-black/70 text-white text-sm p-2 rounded shadow-lg">
                {face.type === "celebrity" ? (
                  <>
                    <p>
                      <strong>Nome:</strong> {name}
                    </p>
                    <p>
                      <strong>Sexo:</strong> {gender}
                    </p>
                    <p>
                      <strong>Match Confidence:</strong>{" "}
                      {matchConfidence?.toFixed(2)}%
                    </p>
                  </>
                ) : (
                  <p>
                    <strong>Rosto:</strong> Unrecognized
                  </p>
                )}
                <p>
                  <strong>Emoção:</strong> {dominantEmotion}
                </p>
              </div>
            )}
            {/* END Tooltip */}
          </div>
        );
      })}
      {/* END Bounding Boxes */}
    </div>
  );
};

export default BoundingBox;
