import { useState } from "react";
import { motion } from "motion/react";

function App() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const gradienDuration = 0.65;
  const swapAnimationDuration = gradienDuration / 2; //Seems to work well after some trial and error
  const texts = [
    [
      "The golden light of the late afternoon sun spilled across the rolling fields, casting long shadows that stretched lazily over the swaying grass. A warm breeze carried the scent of blooming lavender, blending with the earthy aroma of freshly turned soil. Birds flitted through the air, their songs weaving an invisible tapestry of sound that complemented the serene landscape.",
    ],
    [
      "Beyond the fields, the forest loomed like an ancient guardian, its towering trees whispering secrets to the wind. Sunlight filtered through the canopy, dappling the forest floor with flecks of gold and green. A hidden stream meandered through the undergrowth, its waters cool and clear, offering a moment of respite to weary travelers and woodland creatures alike.",
    ],
    [
      "As the sun dipped lower, painting the sky with hues of amber and rose, the world seemed to pause, caught in the fragile balance between day and night. The farmhouse windows glowed with the soft light of a flickering lantern, casting golden reflections onto the garden below. Somewhere in the distance, a lone owl called, its voice a haunting melody that signaled the coming of twilight.",
    ],
  ];

  const handleClick = () => {
    setStartAnimation(true);

    setTimeout(() => {
      setCurrentTextIndex(
        (prevTextIndex) => (prevTextIndex + 1) % texts.length
      );
      setStartAnimation(false);
    }, 700); // Greater than animation duration to prevent abrupt animation
  };

  return (
    <section className="h-screen overflow-clip bg-[#758bfd]">
      <div className="w-[80%] h-full mx-auto flex flex-col items-start justify-center">
        <div className="relative w-[70%]">
          <div className="space-y-4 text-white">
            <p className="text-xl leading-relaxed max-w-[60ch]">
              {texts[currentTextIndex][0]}
            </p>
          </div>

          {/* Clip Path */}
          <motion.div
            className="absolute inset-0 space-y-4 text-white bg-[#758bfd]"
            initial={{ clipPath: "inset(0px 0px 100% 0px)" }}
            animate={
              startAnimation
                ? {
                    clipPath: "inset(0px 0px 0% 0px)",
                  }
                : {}
            }
            transition={
              startAnimation
                ? { duration: swapAnimationDuration, ease: "linear" }
                : { duration: 0 } // Reset animation instantly
            }
          >
            <p className="text-xl leading-relaxed max-w-[60ch]">
              {texts[(currentTextIndex + 1) % texts.length][0]}
            </p>
          </motion.div>

          {/* Moving linear gradient */}
          <motion.div
            className="bg-linear-to-b from-transparent via-[#758bfd]/5 to-[#758bfd] absolute inset-0"
            initial={{ y: "-100%" }}
            animate={startAnimation ? { y: "100%" } : {}}
            transition={
              startAnimation
                ? { duration: gradienDuration, ease: "linear" }
                : { duration: 0 } // Reset animation instantly
            }
          ></motion.div>
        </div>
        <motion.button
          className="my-8 relative z-10 h-8 p-5 items-center flex justify-center text-white font-medium rounded-sm bg-[#27187e] cursor-pointer"
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          Swap text
        </motion.button>
      </div>
    </section>
  );
}

export default App;
