import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/test3.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black">
      {/* Loading Overlay */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video Frame */}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden bg-black">
        {/* Background video */}
        <video
          src={getVideoSrc(currentIndex)}
          autoPlay
          muted
          className="absolute inset-0 size-full object-cover opacity-80"
          onLoadedData={handleVideoLoad}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

        {/* Floating Mini Preview */}
        <div className="absolute bottom-10 right-10 z-30">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-xl hover:scale-105 transition">
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                muted
                id="current-video"
                className="w-40 h-24 object-cover"
                onLoadedData={handleVideoLoad}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex-center text-white text-sm font-semibold">
                Next
              </div>
            </div>
          </VideoPreview>
        </div>

        {/* Main Heading + CTA */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <h1 className="special-font text-6xl sm:text-8xl text-white tracking-tight drop-shadow-lg">
            Book<b></b> <br />
            <span className="text-yellow-300">Club</span>
          </h1>

          <p className="mt-6 max-w-lg text-gray-200 font-robert-regular">
            Enter the Metagame Layer — <br /> Unleash the Play Economy
          </p>

          <Button
            id="watch-trailer"
            title="Show Events"
            leftIcon={<TiLocationArrow />}
            containerClass="mt-10 bg-yellow-300 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-500/40 transition flex-center gap-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
