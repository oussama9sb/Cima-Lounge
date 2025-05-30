const VideoComponent = ({ id, small = true }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="Youtube video player"
      allowFullScreen
    ></iframe>
  );
};

export default VideoComponent;
