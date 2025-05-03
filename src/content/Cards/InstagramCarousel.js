import { useState, useEffect, useRef } from 'react';
import img from "../../assets/images/ElasticAcordianEmages/human1.webp"
import imgg from "../../assets/images/ElasticAcordianEmages/human2.webp"

const InstagramCarousel = ({ 
  profileImage = imgg, 
  username = "Buster", 
  isVerified = true, 
  images = [
    img,
    img,
    img,
    img
  ],
  likes = 3802,
  caption = "Getting ready to paw-ty! 🎉🐾",
  timeAgo = "2 HOURS AGO",
  alts = [] 
}) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  // Track double tap/click
  const [lastTap, setLastTap] = useState(0);

  // Handle pagination dot click
  const scrollToImage = (index) => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const itemWidth = scrollWidth / images.length;
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Handle carousel scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.scrollWidth / images.length;
      const index = Math.round(scrollPosition / itemWidth);
      setCurrentSlide(index);
    }
  };

  // Handle navigation buttons
  const scrollBy = (amount) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: amount,
        behavior: 'smooth'
      });
    }
  };

  // Handle like button click
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setCurrentLikes(prev => prev + 1);
    } else {
      setLiked(false);
      setCurrentLikes(prev => prev - 1);
    }
  };

  // Handle double tap/click on image
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (!liked) {
        setLiked(true);
        setCurrentLikes(prev => prev + 1);
      }
      // Show heart animation
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
    
    setLastTap(now);
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white font-sans  rounded-lg overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
            <img 
              src={profileImage} 
              alt={`${username}'s profile`} 
              className="w-full h-full rounded-full border-2 border-black object-cover"
            />
          </div>
          <div className="flex items-center">
            <p className="text-sm font-bold">{username}</p>
            {isVerified && (
              <span className="ml-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </svg>
              </span>
            )}
          </div>
        </div>
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </header>
      
      {/* Carousel */}
      <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
        <div 
          ref={carouselRef}
          className="scroll-smooth flex snap-x snap-mandatory overflow-x-auto scrollbar-hide" 
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-none w-full h-full snap-center"
              onClick={handleDoubleTap}
            >
              <img
                src={image}
                alt={alts[index] || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Heart animation overlay (appears on double-tap) */}
              {showHeartAnimation && currentSlide === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-scale-up">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="80" 
                      height="80" 
                      viewBox="0 0 256 256" 
                      className="text-white drop-shadow-lg"
                      style={{
                        animation: 'pulse-scale 1s ease-in-out forwards',
                        opacity: 0.9
                      }}
                    >
                      <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between pointer-events-none">
            {currentSlide > 0 && (
              <button 
                className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto"
                onClick={() => scrollBy(-carouselRef.current?.offsetWidth || -470)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            
            {currentSlide < images.length - 1 && (
              <button 
                className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto"
                onClick={() => scrollBy(carouselRef.current?.offsetWidth || 470)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${currentSlide === index ? 'bg-blue-500' : 'bg-white/60'}`}
                onClick={() => scrollToImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <button 
              className={`text-lg transition-transform active:scale-90 ${liked ? 'text-red-500' : 'text-white'}`}
              onClick={handleLike}
            >
              {liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                </svg>
              )}
            </button>
            <button className="text-lg transition-transform active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L32,224l13.4-47Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              </svg>
            </button>
            <button className="text-lg transition-transform active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M210.3,35.9,23.9,88.4a8,8,0,0,0-1.2,15l85.6,40.5a7.8,7.8,0,0,1,3.8,3.8l40.5,85.6a8,8,0,0,0,15-1.2L220.1,45.7A7.9,7.9,0,0,0,210.3,35.9Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <line x1="110.9" y1="145.1" x2="156.1" y2="99.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              </svg>
            </button>
          </div>
          <button className="text-lg transition-transform active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
              <path d="M168,224l-56-40L56,224V72a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
          </button>
        </div>
        
        {/* Likes */}
        <p className="font-bold text-sm py-1">{currentLikes.toLocaleString()} likes</p>
        
        {/* Caption */}
        <div className="py-1">
          <p className="text-sm">
            <span className="font-bold mr-1">{username}</span>
            {caption}
          </p>
        </div>
        
        {/* Timestamp */}
        <p className="text-[10px] text-gray-500 uppercase pt-1 pb-2">{timeAgo}</p>
      </div>

      <style jsx>{`
        @keyframes pulse-scale {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default InstagramCarousel;