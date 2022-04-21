import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer } from 'react-konva';
import { makeStyles } from "@material-ui/core/styles";
import useImage from 'use-image';

const useStyles = makeStyles((theme) => ({
   img: {
      width: "100px",
      height: "90px",
      padding: "5px"
   },

   images: {
      display: "flex",
      flexDireaction: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
   },
   picture: {
      maxWidth: "calc(100% - 100px)",
   },
   stage: {
      maxWidth: "calc(100% - 100px"
   },
   layer: {
      maxWidth: "30px"
   }
}));

const URLImage = ({ image }) => {
   const [img] = useImage(image.src);
   return (
      <Image
         image={img}
         x={200}
         y={100}
         offsetX={img ? img.width / 2 : 0}
         offsetY={img ? img.height / 2 : 0}
      />
   );
};

const Index = () => {
   const dragUrl = useRef();
   const stageRef = useRef();
   const classes = useStyles();
   const [images, setImages] = useState([]);
   const [selectedImages, setSelectedImages] = useState([]);
   const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);

      const imagesArray = selectedFilesArray.map((file) => {
         return URL.createObjectURL(file);
      });
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
   };
   return (
      <section className='root'>
         <div>
            <label className='label'>
               <input
                  className='input'
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
               />
            </label>
            <div>
            </div>
            <div className={classes.images}>
               {selectedImages &&
                  selectedImages.map((image, index) => {
                     return (
                        <div key={index} className="image">
                           <img
                              className={classes.img}
                              src={image} height="200" alt="upload"
                              draggable="true"
                              onDragStart={(e) => {
                                 dragUrl.current = e.target.src;
                              }}
                           />

                        </div>
                     );
                  })}
            </div>
            <div
               onDrop={(e) => {
                  e.preventDefault();
                  stageRef.current.setPointersPositions(e);
                  setImages(
                     images.concat([
                        {
                           ...stageRef.current.getPointerPosition(),
                           src: dragUrl.current,
                        },
                     ])
                  );
               }}
               onDragOver={(e) => e.preventDefault()}
            > <div>
                  <button
                     onClick={() =>
                        setSelectedImages(selectedImages.filter((e) => e !== image))
                     }
                  >
                     delete imagfdweoi
                  </button>
                  <div className={classes.picture}>
                     <Stage
                        className={classes.stage}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        style={{ border: '2px solid grey' }}
                        ref={stageRef}
                     >
                        <Layer className={classes.layer}>
                           {images.map((image) => {
                              return <URLImage image={image} />;
                           })}
                        </Layer>
                     </Stage>
                  </div>
               </div>

            </div>
         </div>
      </section>

   );
};
export default Index