const EarlyEndPage: React.FC<{}> = () => {
  return (
    <div className="px-20 py-10 flex flex-col space-y-4">
      <h1 className="font-bold text-3xl">
        Thanks for your interest in our study!
      </h1>
      <div>
        <p>
          Based on your responses to the warm-up questions, we recommend looking
          for another study to participate in at this time. Please return to{" "}
          <a
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
            href="https://app.prolific.com/"
          >
            https://app.prolific.com/
          </a>
          .
        </p>
      </div>
    </div>
  );
};
export default EarlyEndPage;
