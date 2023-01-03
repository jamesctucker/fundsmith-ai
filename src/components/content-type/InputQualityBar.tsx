type Props = {
  parameterName: string;
  characterCount: number | undefined;
  maxLength: number;
};

const InputQualityBar = ({
  parameterName,
  characterCount,
  maxLength,
}: Props) => {
  const getQuality = (id: string) => {
    if (!characterCount) {
      return;
    }

    const percentage = (characterCount! / maxLength) * 100;

    return (
      <>
        {/* TODO add transition for when bar progresses */}
        {percentage < 10 && (
          <div
            className="h-2 rounded-full bg-error"
            style={{ width: "33.3%" }}
          />
        )}
        {percentage >= 10 && percentage < 25 && (
          <div
            className="h-2 rounded-full bg-yellow-400"
            style={{ width: "66.6%" }}
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
    {
      /* <div className="text-left text-warning">Fair</div>
        <div className="text-left text-success">Great!</div> */
    }

    if (!characterCount) {
      return;
    }

    return <div className="text-left text-error">Weak</div>;
  };

  return (
    <div className="input-quality-status-bar mt-2" aria-hidden="true">
      <div className="overflow-hidden rounded-full bg-gray-200">
        {getQuality(parameterName)}
      </div>
      <div className="mt-1 hidden text-sm font-medium text-gray-600 sm:flex">
        {showQualityInfo()}
      </div>
    </div>
  );
};

export default InputQualityBar;
