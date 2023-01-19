type SaveButtonProps = {
  cta: string;
  onClick: () => void;
};

const SaveButton = ({ cta, onClick }: SaveButtonProps) => {
  return (
    <>
      <button
        type="button"
        className="border-b border-primary hover:text-secondary hover:border-secondary hover:-translate-y-1 transition ease-in-out delay-50"
        onClick={onClick}
      >
        {cta}
      </button>
    </>
  );
};

export default SaveButton;
