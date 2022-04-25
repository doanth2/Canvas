import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
const ClassReact = () => {
   // const trRef = useRef();
  //  // let transformer = new Konva.Transformer;
  //  const loadImage = () => {
  //     const img = new window.Image();
  //     const transformer = new Konva.Transformer;
  //     img.src = src;
  //     img.crossOrigin = "Anonymous";
  //     imageRef.current = img;
  //     imageRef.current.addEventListener("load", handleLoad);
  //     };
  //     const img = new window.Image();

  const [image, setImage] = useState(null);
  useEffect(() => {
    let imageNew = new window.Image();

    imageNew.onload = () => {
      setImage(() => transformer.attachTo(image));
    }}, []);
    const transformer = new Konva.Transformer;
      
  const handleTransform = () => {
    const props = {
      x: image.x(),
      y: image.y(),
      rotatio: image.rotation(),
      width: image.width(),
      height: image.height(),
      scaleX: image.scaleX(),
      scaleY: image.scaleY(),
    };
    console.log(props);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
               image={image}
          ref={(node) => {
            image = node;
          }}
          draggable
          onTransform={handleTransform}
          onDragMove={handleTransform}
        />
        <Transformer
          ref={(node) => {
            transformer = node
          }}
        />
      </Layer>
    </Stage>
  );
};
export default ClassReact;