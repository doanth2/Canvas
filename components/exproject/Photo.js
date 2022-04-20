import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactCrop from 'react-image-crop'
import ImageList from '@material-ui/core/ImageList';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css'
import Grid from '@material-ui/core/Grid';
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      justifyContent: "center"
   },
   result: {
      width: "30px"
   },
   buttonCrop: {
      display: "flex",
      justifyContent: "center",
      margin: "15px 80px"
   },
   listImg: {
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      // maxHeight: "150px",
      backgroundColor: "#e8eaf6",
      width: "250px",
      height: "500px",
      // overflow: "scroll"
   },
   img: {
      display: "flex",
      justifyContent: "center",
      width: "100px",
      height: "100px",
      padding: "3px",
      cursor: "pointer",
      margin: "5px",
      "&:hover": { backgroundColor: "#2275D2", color: "#fff" },
   },

   label: {
      maxWidth: "150px"
   },
   removeButton: {
      padding: "0 1px 0 1px",
      backgroundColor: "#FFFFFF"
   },
   input: {
      border: "1px solid #ff4081",
      display: "inline-block",
      padding: "6px",
      marginTop: "10px",
      marginLeft: "15px",
      cursor: "pointer",
      "& button": {
         minWidth: "10%",
      },
   },
   selected: {
      border: "4px solid #ff4081",
      width: "300px",
      height: "300px",
   },
   dropImg: {
      backgroundColor: "lightgrey",
      width: "400px",
      border: "0 solid none",
      padding: "60px",
      margin: "20px"
   }
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
const Photo = () => {
   const classes = useStyles();

   const [selectedImg, setSelectedImg] = useState(photo)
   const [selectedImages, setSelectedImages] = useState([]);
   const [crop, setCrop] = useState({ aspect: 16 / 9 });
   const [result, setResult] = useState()

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
      const cropImage = canvas.toDataURL('image/png')
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
   return (
      <section>
         <Grid container spacing={2}>
            <Grid item xs={4}>
               <label className={classes.label}>
                  <input
                     className={classes.input}
                     type="file"
                     name="images"
                     onChange={onSelectFile}
                     multiple
                     accept="image/png , image/jpeg, image/webp"
                  />
               </label>
               <div className={classes.listImg}>
                  <ImageList variant="woven" cols={2} rowHeight={164}>
                     {selectedImages && selectedImages.map((img) => {
                        return (
                           <div>
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
            </Grid>
            <Grid item xs={8}>
               <Button className={classes.buttonCrop}
                  variant="contained" color="secondary"
                  onClick={getCroppedImg}>
                  Crop Image
               </Button>
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
                              src={selectedImg}
                              className={classes.selected}
                           />
                        </div>
                     </ReactCrop>
                  )}
               </div>
               {result && <div className={classes.result}>
                  <img src={result} alt="crop image" />
               </div>}
            </Grid>
            <div className={classes.root}>
            </div>
         </Grid>
      </section>

   )
}
export default Photo