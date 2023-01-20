import LoadingSpinner from "@/components/LoadingSpinner";

type ButtonProps = {
  loading: boolean;
  cta: string;
  onClick?: () => void;
};

const SubmitButton = ({ loading, cta, onClick }: ButtonProps) => {
  return (
    <button
      className="btn-primary flex items-center hover:-translate-y-1 transition ease-in-out delay-50"
      type="submit"
      disabled={loading}
    >
      {loading && <LoadingSpinner />}
      <span className="flex items-center justify-center">{cta}</span>
    </button>
  );
};

export default SubmitButton;
