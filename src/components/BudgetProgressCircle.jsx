const BudgetProgressCircle = ({
  percentage = 63,
  size = 160,
  strokeWidth = 14,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center mt-12 mr-6"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#22C55E"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-900">
          {percentage}%
        </h2>
        <p className="text-gray-500 text-lg font-semibold">Used</p>
      </div>
    </div>
  );
};

export default BudgetProgressCircle;