type SpinnerProps = {
  copy?: string;
  width?: number;
  height?: number;
};

const LoadingSpinner = ({ copy, width, height }: SpinnerProps) => {
  return (
    <>
      <div
        className="w-5 h-5 rounded-full animate-spin border-4 border-solid border-base-100 border-t-transparent mr-3"
        style={{
          width: width || 20,
          height: height || 20,
        }}
      />
      {copy && <span className="flex items-center justify-center">{copy}</span>}
    </>
  );
};

export default LoadingSpinner;
