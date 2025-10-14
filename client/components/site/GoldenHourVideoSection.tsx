const GoldenHourVideoSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="relative w-full">
        <video
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/v1760426427/golden_hour_opn5pm.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default GoldenHourVideoSection;
