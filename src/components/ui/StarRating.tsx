"use client";

export const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  rating = rating > 10 ? 10 : rating;
  const renderStars = (rating: number): JSX.Element[] => {
    const numberOfStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
      stars.push(
        <img key={i} src="/star.png" alt="Star" className="w-4 h-4" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <img
            src="/star.png"
            alt="Half Star"
            className="absolute h-full"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    return stars;
  };

  const rate = rating / 2 > 0 ? rating / 2 : "";

  return (
    <div className="flex h-4">
      {renderStars(rating)}
      <p className="ml-1 text-xs leading-5">{rate}</p>
    </div>
  );
};
