import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactCrop from 'react-image-crop'
import ImageList from '@material-ui/core/ImageList';
import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css'
const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      justifyContent: "space-evenly",
      marginTop: "20px",
      "@media screen and (max-width: 767px)": {
         display: "block",
      },
   },
   column: {
      flexBasis: "30%",
      padding: "12px 16px",
      "@media screen and (max-width: 767px)": {
         margin: "0 auto"
      },
   },
   input: { 
      display: "flex",
      margin: "0 0 35px 50px",
      padding: "7px",
      cursor: "pointer",
      fontSize:"0.8rem",
      justifyContent:"center",
      "& button": {
         minWidth: "10%",
      },
      "@media screen and (max-width: 767px)": {
         display: "flex",
         margin: "0 auto",
         marginBottom: "15px",
      },
   },
   listImg: {
      backgroundColor: "#ECEEF1",
      width: "270px",
      height: "500px",
      overflow: "scroll",
      "@media screen and (max-width: 767px)": {
         display: "flex",
         margin: "0 auto",
         marginBottom: "15px",
      },
   },
   img: {
      width: "100px",
      height: "100px",
      padding: "3px",
      cursor: "pointer",
      margin: "5px",
      "&:hover": { backgroundColor: "#2275D2", color: "#fff" },
      "@media screen and (max-width: 767px)": {
         display: "flex",

      },
   },
   label: {
      maxWidth: "150px"
   },
   form: {
      padding: "8px 0",
      display: "flex",
      "@media screen and (max-width: 767px)": {
         padding: "8px",
         marginBottom: "10px"
      },
   },
   formLabel: {
      minWidth: "90px"
   },
   formInput: {
      flex: "1"
   },
   removeButton: {
      padding: "0 1px 0 1px",
      backgroundColor: "#FFFFFF"
   },

   selected: {
      border: "4px solid #ff4081",
      width: "300px",
      height: "300px",
      "@media screen and (max-width: 767px)": {
         display: "flex",
         width: "60%",
         height: "60%",
         marginRight: "90px"
      },
   },
   buttonCrop: {
      margin: "10px 170px",
      borderRadius: "5px",
      "@media screen and (max-width: 767px)": {
         display: "flex",
         margin: "0 auto",
         marginTop: "30px"
      },
   },
   dropImg: {
      backgroundColor: "#ECEEF1",
      width: "470px",
      border: "0 solid none",
      padding: "65px",
      display: "flex",
      justifyContent: "center",
   },
   result: {
      margin: "75px 80px",
      "@media screen and (max-width: 767px)": {
         display: "flex",
         marginTop: "10px",
         justifyContent: "center"
      },
   },
}));
const createImage = (url) =>
   new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
   });
const photo = ["https://image.shutterstock.com/image-photo/picture-beautiful-view-birds-260nw-1836263689.jpg"]
const Canvas = () => {
   const classes = useStyles();

   const [selectedImg, setSelectedImg] = useState(photo)
   const [selectedImages, setSelectedImages] = useState([]);
   const [crop, setCrop] = useState({ aspect: 16 / 9 });
   const [rotate, setRotate] = useState(0);
   const [result, setResult] = useState()
   const [scale, setScale] = useState(1)
   const hiddenFileInput = useRef(null);

   async function getCroppedImg() {
      const image = await createImage(selectedImg);
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
         image,
         crop.x * scaleX,
         crop.y * scaleY,
         crop.width * scaleX,
         crop.height * scaleY,
         0,
         0,
         crop.width * scaleX,
         crop.height * scaleY
      );
      const cropImage = canvas.toDataURL('image/jpeg/png')
      setResult(cropImage)
   }
   const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray = selectedFilesArray.map((file) => {
         return URL.createObjectURL(file);
      });
      setSelectedImages((prevImages) => prevImages.concat(imagesArray));
   };
   const handleClick = event => {
      hiddenFileInput.current.click();
   };
   return (
      <section>
         <div className={classes.root}>
            <div className={classes.column}>
               <label className={classes.label} htmlFor="rotate-input">
                  <Button onClick={handleClick} variant="contained"
                     color="primary" className={classes.input}
                  >
                     Upload Images
                  </Button>
                  <input
                     type="file"
                     name="images"
                     onChange={onSelectFile}
                     ref={hiddenFileInput}
                     style={{ display: 'none' }}
                     multiple
                     accept="image/png , image/jpeg, image/webp"
                  />
               </label>
               <div className={classes.listImg}>
                  <ImageList variant="woven" cols={2} rowHeight={164}>
                     {selectedImages && selectedImages.map((img, index) => {
                        return (
                           <div key={index}>
                              <img
                                 src={img} alt="img" className={classes.img}
                                 style={{ border: selectedImg === img ? "4px solid #ff4081" : "" }}
                                 onClick={() => setSelectedImg(img)}
                              />
                              <button
                                 className={classes.removeButton}
                                 onClick={() =>
                                    setSelectedImages(selectedImages.filter((e) => e !== img))
                                 }
                              >
                                 x
                              </button>
                           </div>
                        );
                     })}
                  </ImageList>
               </div>
            </div>
            <div className={classes.column}>
               <div className={classes.form}>
                  <label
                     className={classes.formLabel}
                     htmlFor="scale-input">Scale: </label>
                  <input
                     className={classes.formInput}
                     id="scale-input"
                     type="number"
                     step="0.1"
                     value={scale}
                     onChange={(e) => setScale(Number(e.target.value))}
                  />
               </div>
               <div className={classes.form}>
                  <label
                     className={classes.formLabel}
                     htmlFor="rotate-input">Rotate: </label>
                  <input
                     className={classes.formInput}
                     id="rotate-input"
                     type="number"
                     value={rotate}
                     onChange={(e) =>
                        setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                     }
                  /></div>
               <div className={classes.container}
               >
                  {Boolean(selectedImg) && (
                     <ReactCrop
                        crop={crop}
                        onChange={setCrop}
                     >
                        <div className={classes.dropImg}>
                           <img
                              alt="Crop me"
                              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                              src={selectedImg}
                              className={classes.selected}
                           />
                        </div>
                     </ReactCrop>
                  )}
               </div>
               <Button className={classes.buttonCrop}
                  variant="contained" color="secondary"
                  onClick={getCroppedImg}>
                  Crop Image
               </Button>
            </div>
            <div className={classes.column}>
               {result && <div className={classes.result}>
                  <img src={result} alt="crop image" />
               </div>}
            </div>
         </div>
      </section>
   )
}
export default Canvas