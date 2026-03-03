import React from 'react';

const LOGOS = [
  'https://bowmanconstructors.com/wp-content/uploads/2019/06/logo-e1560287836231.png',
  'https://patco.com/wp-content/uploads/2020/04/PATCO-Banner-1024x195.webp',
  // Add more logos here as they are found
];

export const LogoScroller: React.FC = () => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {LOGOS.map((logo, index) => (
          <li key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} className="h-12" />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        {LOGOS.map((logo, index) => (
          <li key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} className="h-12" />
          </li>
        ))}
      </ul>
    </div>
  );
};
