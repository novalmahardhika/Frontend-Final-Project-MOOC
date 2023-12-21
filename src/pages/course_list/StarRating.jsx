// StarRating.jsx

import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  const numberOfStars = parseInt(rating);

  return (
    <div className="flex items-center">
      {[...Array(numberOfStars)].map((_, index) => (
        <svg
          key={index}
          className="h-4 w-4 fill-current text-active"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 0l2.5 6.5H18l-5 4.8 2.5 6.7-6-4.7-6 4.7 2.5-6.7L0 6.5h7.5L10 0z"
          />
        </svg>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
