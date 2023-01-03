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
      <div>
        {percentage < 10 && (
          <div
            className="h-2 rounded-full bg-error"
            style={{ width: "33.3%" }}
          />
        )}
        {percentage >= 10 && percentage < 25 && (
          <div
            className="h-2 rounded-full bg-warning"
            style={{ width: "66.6%" }}
          />
        )}
        {percentage >= 25 && (
          <div
            className="h-2 rounded-full bg-success"
            style={{ width: "100%" }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="input-quality-status-bar mt-2" aria-hidden="true">
      <div className="overflow-hidden rounded-full bg-gray-200">
        {getQuality(parameterName)}
      </div>
      {/* <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div className="text-left text-error">Weak</div>
                  <div className="text-center text-warning">Good</div>
                  <div className="text-right text-success">Great!</div>
                </div> */}
    </div>
  );
};

export default InputQualityBar;
