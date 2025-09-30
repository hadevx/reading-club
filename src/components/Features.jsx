import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

// Tilt Wrapper
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}>
      {children}
    </div>
  );
};

// Card Component (with gradient background)
export const BentoCard = ({ gradient, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full overflow-hidden rounded-md">
      {/* Gradient background */}
      <div className={`absolute left-0 top-0 size-full ${gradient}`} />

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/50 px-5 py-2 text-xs uppercase text-white/40">
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #ffffff55, transparent)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Gradient palette
const gradients = {
  purplePink: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
  blueGreen: "bg-gradient-to-br from-blue-400 via-cyan-500 to-green-400",
  orangeYellow: "bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400",
  violetIndigo: "bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600",
  emeraldTeal: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500",
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">Explore the AUK Book Club</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          More than just reading—we host events, share stories, and build a vibrant student
          community that celebrates literature and ideas.
        </p>
      </div>

      {/* First big card */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          gradient={gradients.purplePink}
          title={
            <>
              Readi<b>n</b>g Circles
            </>
          }
          description="Join small group discussions where we explore novels, poetry, and essays together."
          isComingSoon
        />
      </BentoTilt>

      {/* Grid of cards */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            gradient={gradients.blueGreen}
            title={
              <>
                C<b>a</b>mpus Events
              </>
            }
            description="From author talks to themed gatherings, we make literature a shared experience."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            gradient={gradients.orangeYellow}
            title={
              <>
                Stu<b>d</b>ent Voices
              </>
            }
            description="A platform for students to share reviews, essays, and creative writing pieces."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            gradient={gradients.violetIndigo}
            title={
              <>
                Lit<b>e</b>rary Collabs
              </>
            }
            description="Collaborating with clubs and departments across AUK to enrich our campus culture."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 p-5">
            <h1 className="bento-title special-font max-w-64 text-white">
              M<b>o</b>re events <b>c</b>oming s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end text-white" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
