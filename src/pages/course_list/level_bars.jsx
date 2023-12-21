import PropTypes from "prop-types";

const LevelBars = ({ count }) => {
  const bars = Array.from({ length: count }, (_, index) => (
    <span
      key={index}
      className={`inline-block h-${index + 2} w-2 bg-primary rounded-sm mx-[0.5px]`}
    ></span>
  ));

  return <span>{bars}</span>;
};

LevelBars.propTypes = {
  count: PropTypes.number.isRequired,
};

export default LevelBars;
