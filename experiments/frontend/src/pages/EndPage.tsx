interface IEndPageProps {
  code: string;
}

const EndPage: React.FC<IEndPageProps> = ({
  code,
}) => {
  return (
    <div className="px-20 py-10 flex flex-col space-y-4">
      <h1 className="font-bold text-3xl">Thank you for your participation!</h1>
        <div>
          <p>
            To claim your reward, please visit <a className="text-blue-600" target="_blank" rel="noopener noreferrer" href="https://app.prolific.com/submissions/complete?cc=CSUVIWY7">
            https://app.prolific.com/submissions/complete?cc=CSUVIWY7
            </a> or copy the Completion Code below to enter on
            Prolific.
          </p>
          <pre>{code}</pre>
          <p>
            After submitting the code, you may close this page. Have a good rest
            of your day!
          </p>
        </div>
    </div>
  );
};
export default EndPage;