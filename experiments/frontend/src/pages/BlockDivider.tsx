

const BlockDivider: React.FC<{}> = () => {
  // const navigate = useNavigate();

  const onClickContinue: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
  };

  return (
    <div
      style={{ fontFamily: "Optima, sans-serif" }}
      className="px-20 py-10 flex flex-col h-screen"
    >
      <div className="my-auto">
        <div className="mx-auto text-4xl">
          {/* {text} */}
          Let's get started with the real questions!
        </div>
        <button
          onClick={onClickContinue}
          className="bg-slate-300 hover:bg-slate-200 px-4 py-2 mt-8 rounded-md w-full"
        >
          I'm ready to continue
        </button>
      </div>
    </div>
  );
};

export default BlockDivider;
