import React, { useEffect, useState } from "react";
import { data } from './data/work';
import { PiLinkedinLogoThin, PiGithubLogoThin, PiPaperPlaneTiltThin, PiArticleThin, PiArrowRightThin } from "react-icons/pi";

import './index.scss';

const App = () => {
  const [activeSlide, setActiveSlide] = useState(null); // Active slide index
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1400);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://panorama-slider.uiinitiative.com/assets/index.c1d53924.css";
    document.head.appendChild(link);

    const preloadLink = document.createElement("link");
    preloadLink.rel = "modulepreload";
    preloadLink.href =
      "https://panorama-slider.uiinitiative.com/assets/vendor.dba6b2d2.js";
    document.head.appendChild(preloadLink);

    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.src =
      "https://panorama-slider.uiinitiative.com/assets/index.d2ce9dca.js";
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      const activeBullet = document.querySelector(
        ".swiper-pagination-bullet.swiper-pagination-bullet-active"
      );

      if (activeBullet) {
        // Get the index and adjust it if necessary
        const index = Array.from(
          activeBullet.parentElement.children
        ).indexOf(activeBullet);

        setActiveSlide(index - 1 < 0 ? 7 : index - 1); // Ensure no negative indices
      }
    });

    const pagination = document.querySelector(".swiper-pagination");
    if (pagination) {
      observer.observe(pagination, { attributes: true, subtree: true });
    }

    // Simulate loading animation
    setTimeout(() => setIsLoading(false), 3000);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(preloadLink);
      document.body.removeChild(script);
      observer.disconnect(); // Stop observing
    };
  }, []);

  if (isSmallScreen) {
    return (
      <div className="under-construction">
        <h1>Under Construction</h1>
        <p>This site is best viewed on a desktop screen.</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-bar"></div>
        </div>
      )}
      <div className="content">
        <h1>Adi Vrskic</h1>

        <div className="panorama-slider">
          <div className="swiper">
            <div className="swiper-wrapper">
              {data?.map((item, i) => {
                const isActive = activeSlide === i;

                // Define dynamic box-shadow for active slide
                const boxShadow = isActive
                  ? `
                    inset 0 0 25px ${item.color1 || 'rgba(255, 255, 255, 0.25)'}, 
                    inset 10px 0 40px ${item.color2 || 'rgba(255, 0, 255, 0.25)'}, 
                    inset -10px 0 40px ${item.color3 || 'rgba(0, 255, 255, 0.25)'}, 
                    inset 10px 0 150px ${item.color2 || 'rgba(255, 0, 255, 0.25)'}, 
                    inset -10px 0 150px ${item.color3 || 'rgba(0, 255, 255, 0.25)'}, 
                    0 0 25px ${item.color1 || 'rgba(255, 255, 255, 0.25)'}, 
                    -5px 0 40px ${item.color2 || 'rgba(255, 0, 255, 0.25)'}, 
                    5px 0 40px ${item.color3 || 'rgba(0, 255, 255, 0.25)'}`
                  : 'none';

                return (
                  <div
                    key={i}
                    className="swiper-slide"
                    style={{
                      boxShadow: boxShadow,
                      transition: 'box-shadow 0.2s ease-in',
                    }}
                  >
                    <img
                      className="slide-image"
                      src={item?.image}
                      alt={item?.alt}
                    />
                  </div>
                );
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>

        <div className="slide-info">
          {data[activeSlide] && 
            <a className="slide-info-link" href={data[activeSlide]?.link} target="_blank" rel="noreferrer">
              <h2>{data[activeSlide]?.name}</h2>
              <PiArrowRightThin />
            </a>
          }
          <div className="slide-info-skills">
            {data[activeSlide] && data[activeSlide]?.skills?.map(skill => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="vignette"></div>

        <div className="links">
          <a href="mailto:adivrskic123@gmail.com" aria-label="adi vrskic's email">
            <PiPaperPlaneTiltThin />
          </a>
          <a
            href="https://github.com/adivrskic"
            aria-label="adi vrskic's github"
            target="_blank"
            rel="noreferrer"
          >
            <PiGithubLogoThin />
          </a>
          <a
            href="https://linkedin.com/in/adi-vrskic"
            aria-label="adi vrskic's linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <PiLinkedinLogoThin />
          </a>
          <a
            href="/Adi_Vrskic_Resume-1.pdf"
            aria-label="adi vrskic's resume"
            target="_blank"
          >
            <PiArticleThin />
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
