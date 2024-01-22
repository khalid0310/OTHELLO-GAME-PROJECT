// Video.js

import React from 'react';
import ReactPlayer from 'react-player';
import { FaArrowDown, FaFilm } from 'react-icons/fa';

const Video = () => {
  const videoUrl = 'https://youtu.be/zFrlu3E18BA?si=eYhmmuLIXLrGXQqj';

  return (
    <div className="relative mb-3">
      <div className='flex gap-2 items-center'>
        <h1 className='text-4xl py-6 font-thin'>Video Tutorial</h1>
        <FaFilm className='py-4 text-8xl' />
      </div>
      <div className="w-full h-[90vh]">
        <ReactPlayer
          url={videoUrl}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-2xl">
        <FaArrowDown />
      </div>
    </div>
  );
};

export default Video;
