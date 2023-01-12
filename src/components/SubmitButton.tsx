type ButtonProps = {
  loading: boolean;
  cta: string;
  onClick?: () => void;
};

const SubmitButton = ({ loading, cta, onClick }: ButtonProps) => {
  return (
    <button
      className=" btn-primary mt-4 sm:mt-6 md:mt-8 flex items-center"
      type="submit"
    >
      {loading && (
        <div className="w-5 h-5 rounded-full animate-spin border-4 border-solid border-base-100 border-t-transparent mr-3" />
      )}

      <span className="flex items-center justify-center">{cta}</span>
    </button>
  );
};

export default SubmitButton;
