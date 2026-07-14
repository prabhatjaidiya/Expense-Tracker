const BudgetProgressCircle = ({
  percentage = 0,
  progressColor ,
  size = 160,
  strokeWidth = 14,
}) => {
  // Prevent values below 0 or above 100
  const progress = Math.min(Math.max(percentage, 0), 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
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
          stroke='#E5E7EB'
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset .6s ease",
          }}
        />
      </svg>

      <div className="absolute text-center">
        <h2 className="text-4xl font-bold">
          {progress.toFixed(0)}%
        </h2>
        <p className="text-gray-500 font-medium">
          Used
        </p>
      </div>
    </div>
  );
};

export default BudgetProgressCircle;