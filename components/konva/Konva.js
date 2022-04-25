import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} />;
};
// the first very simple and recommended way:
const URLImage = ({ src, x, y }) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  const loadImage = () => {
    const img = new window.Image();
    // setImage(()=>{(image)
    //   transformer.attachTo(image)
    // })
    img.src = src;
    img.crossOrigin = "Anonymous";
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);
  };

  const handleLoad = () => {
    setImage(imageRef.current);
  };

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    loadImage();
  }, [src]);

  return <image x="{x}" y="{y}" image="{image}" />;
};

export default function Konva() {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} /> */}
          <LionImage />
        </Layer>
      </Stage>
    </div>
  )
}
