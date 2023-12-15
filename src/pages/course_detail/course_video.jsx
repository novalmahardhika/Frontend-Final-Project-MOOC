import PropTypes from "prop-types";
import YouTube from "react-youtube";

const VideoThumbnail = ({ videoUrl }) => {
  const isYouTubeVideo = isYouTubeUrl(videoUrl);
  const videoId = getYouTubeVideoId(videoUrl);

  const opts = {
    height: "500",
    width: "860",
    playerVars: {
      autoplay: 0,
    },
  };

  function isYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.test(url);
  }

  function getYouTubeVideoId(url) {
    const match = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.exec(url);
    return match ? match[4] : null;
  }

  return (
    <div>
      {isYouTubeVideo ? (
        <div className="rounded-lg mt-10 overflow-hidden w-fit">
          <YouTube
            videoId={videoId}
            opts={opts}
          />
        </div>
      ) : (
        <div className="rounded-lg mt-10 overflow-hidden w-fit">
          <video
            controls
            width="860"
            height="500"
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

VideoThumbnail.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoThumbnail;
