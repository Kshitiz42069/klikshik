import React, { useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';

interface Image {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
}

const images: Image[] = [
  { id: 1, src: require('../../../assets/sample/cars.png'), thumbnail: require('../../../assets/sample/cars.png'), alt: 'image1' },
  { id: 2, src: require('../../../assets/sample/cars2.jpg'), thumbnail: require('../../../assets/sample/cars2.jpg'), alt: 'image2' },
  { id: 3, src: require('../../../assets/sample/cars3.jpg'), thumbnail: require('../../../assets/sample/cars3.jpg'), alt: 'image3' },
  { id: 4, src: require('../../../assets/sample/cars4.jpg'), thumbnail: require('../../../assets/sample/cars4.jpg'), alt: 'image4' },
  { id: 5, src: require('../../../assets/sample/cars5.jpg'), thumbnail: require('../../../assets/sample/cars5.jpg'), alt: 'image5' },
  { id: 6, src: require('../../../assets/sample/cars6.jpg'), thumbnail: require('../../../assets/sample/cars6.jpg'), alt: 'image6' },
  { id: 7, src: require('../../../assets/sample/cars7.jpg'), thumbnail: require('../../../assets/sample/cars7.jpg'), alt: 'image7' },
  { id: 8, src: require('../../../assets/sample/cars8.jpg'), thumbnail: require('../../../assets/sample/cars8.jpg'), alt: 'image8' },
  { id: 9, src: require('../../../assets/sample/cars9.jpg'), thumbnail: require('../../../assets/sample/cars9.jpg'), alt: 'image9' },
];

const Viewer: React.FC = () => {
  const [selectedImage, setSelectedImage] = React.useState<string>(images[0].src);
  const [current, setCurrent] = React.useState<number>(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevSelected) => (prevSelected + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setSelectedImage(images[current].src);
    
    if (thumbnailRef.current) {
      const selectedThumbnail = thumbnailRef.current.children[current] as HTMLElement;
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [current]);

  return (
    <div className='bg-white h-full rounded-xl p-8'>
      <p className='text-3xl font-semibold'>Carousel</p>
      <div className='w-[50rem] ml-[4rem] p-10 flex flex-col items-center justify-center gap-[2rem]'>
        {/* Display selected image */}
        <div className='w-[50rem] flex items-center justify-center'>
          <img src={selectedImage} alt="Selected Car" className='rounded-xl w-full h-[25rem]' />
        </div>
        {/* Thumbnail Swiper */}
        <div ref={thumbnailRef} className="flex no-scrollbar overflow-x-auto gap-2 mb-4 w-[50rem] h-[6rem] items-center justify-start px-2">
          {images.map((image) => (
            <LazyLoad key={image.id}>
              <img
                src={image.thumbnail}
                alt={image.alt}
                className={`min-w-[6.6rem] h-[4rem] border-2 border-gray-300 rounded-md transition duration-300 ${selectedImage === image.thumbnail ? 'scale-125' : ''}`}
                onClick={() => {
                  setSelectedImage(image.src);
                  setCurrent(image.id - 1);
                }}
              />
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewer;
