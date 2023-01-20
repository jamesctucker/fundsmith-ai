import { useMemo } from "react";

type Props = {
  characterCount: number | undefined;
  maxLength: number;
};

const InputQualityBar = ({ characterCount, maxLength }: Props) => {
  const percentage = useMemo(
    () => (characterCount! / maxLength) * 100,
    [characterCount, maxLength]
  );
  const quality = useMemo(() => {
    if (percentage < 10) {
      return "Weak";
    } else if (percentage >= 10 && percentage < 25) {
      return "Fair";
    } else {
      return "Great";
    }
  }, [percentage]);

  const getQuality = () => {
    if (!characterCount) {
      return;
    }

    return (
      <>
        {/* TODO add transition for when bar progresses */}
        {percentage < 10 && (
          <div className="h-2 rounded-full bg-error" style={{ width: "25%" }} />
        )}
        {percentage >= 10 && percentage < 25 && (
          <div
            className="h-2 rounded-full bg-yellow-400"
            style={{ width: "50.0%" }}
          />
        )}
        {percentage >= 25 && (
          <div
            className="h-2 rounded-full bg-success"
            style={{ width: "100%" }}
          />
        )}
      </>
    );
  };

  const showQualityInfo = () => {
    if (!characterCount) {
      return;
    }

    return (
      <>
        {quality === "Weak" && (
          <>
            <span className="quality-badge bg-error text-white ">Weak</span>
            <p>
              Use a description of at least {maxLength * 0.1} characters for
              top-quality generation.
            </p>
          </>
        )}
        {quality === "Fair" && (
          <>
            <span className="quality-badge bg-warning text-white">Fair</span>
            <p>Improve quality by using a more detailed description.</p>
          </>
        )}
        {quality === "Great" && (
          <>
            <span className="quality-badge bg-success text-white">Great!</span>
            <p>
              You can expect high-quality variants from this superb response.
            </p>
          </>
        )}
      </>
    );
  };

  return (
    <div className="input-quality-status-bar mt-2" aria-hidden="true">
      <div className="overflow-hidden rounded-full bg-gray-200">
        {getQuality()}
      </div>
      <div className="mt-1 text-xs font-medium text-neutral flex justify-between items-start">
        {showQualityInfo()}
      </div>
    </div>
  );
};

export default InputQualityBar;
