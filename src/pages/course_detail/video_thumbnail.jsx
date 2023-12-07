import YouTube from "react-youtube";
import PropTypes from "prop-types";

const VideoThumbnail = ({ videoUrl }) => {
  const opts = {
    height: "500",
    width: "860",

    playerVars: {
      autoplay: 0,
    },
  };

  // Extract videoId from the URL, or set it to null if the URL is invalid
  const videoId = extractVideoId(videoUrl);

  // Function to extract videoId from YouTube URL
  function extractVideoId(url) {
    try {
      const videoId = new URLSearchParams(new URL(url).search).get("v");
      return videoId || null;
    } catch (error) {
      console.error("Invalid video URL:", url);
      return null;
    }
  }

  // Render YouTube component only if videoId is valid
  return (
    <div className="rounded-lg mt-10 overflow-hidden w-fit">
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={opts}
        />
      )}
    </div>
  );
};

VideoThumbnail.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoThumbnail;
