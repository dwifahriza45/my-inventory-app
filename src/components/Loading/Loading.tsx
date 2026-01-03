import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="80"
          height="80"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#4A90E2"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="100"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1s"
              values="0 50 50;360 50 50"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="1.5s"
              values="0;502.4"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Loading;
=======
export default Loading;
>>>>>>> d949834111886c2f77b3c8a3b02298ea0e9180d3
