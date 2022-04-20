import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
   img: {
      width: "100px",
      height: "50px",
      padding: "5px"
   }
}));

const UploadImage = ({ listImage, setListImage, setSelectedImage }) => {
   const classes = useStyles();
   const [addFileImages, setAddFileImages] = useState([])
   const imageHandleChange = (e) => {
      // console.log(e.target.files)
      if (e.target.files) {
         const fileArray = Array.from(e.target.files).map((name) => URL.createObjectURL(name))
         // console.log(fileArray)
         setAddFileImages((prevImages) => prevImages.concat(fileArray))
         Array.from(e.target.files).map((name) => URL.createObjectURL(name))
      }
   };
   const renderImages = (showImages) => {
      console.log(showImages)
      return showImages.map((photos) => {
         return <img className={classes.img} src={photos} key={photos} />
      })
   };
   return (
      <section>
         <Grid container spacing={2}>
            <Grid item xs={12} className={classes.cardContent}>
               <div>
                  <input type="file" multiple id="file" onChange={imageHandleChange} />
                  <label htmlFor="file">
                     <i>Add tệp vào đây</i>
                  </label>
               </div>
               <div className="result">
                  {renderImages(addFileImages)}
               </div>
            </Grid>
         </Grid>
      </section>
   )
}
export default UploadImage 