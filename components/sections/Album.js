import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
   img: {
      width: "100px",
      height: "50px",
      padding: "5px"
   }
}));

const Album = () => {
   const classes = useStyles();
   const [selectImgaes, setSelectedImages] = useState([])
   const imageHandleChange = (e) => {
      // console.log(e.target.files)
      if (e.target.files) {
         const fileArray = Array.from(e.target.files).map((name) => URL.createObjectURL(name))
         // console.log(fileArray)
         setSelectedImages((prevImages) => prevImages.concat(fileArray))
         Array.from(e.target.files).map((name)=>URL.createObjectURL(name))
      }
   };
   const renderImages = (showImages) => {
      console.log(showImages)
      return showImages.map((takeImages) => {
         return <img className={classes.img} src={takeImages} key={takeImages} />
      })
   };
   return (
      <section>
         <div>
            <input type="file" multiple id="file" onChange={imageHandleChange} />
            <label htmlFor="file">
               <i>Add tệp vào đây</i>
            </label>
         </div>
         <div className="result">
            {renderImages(selectImgaes)}
         </div>
      </section>
   )
}
export default Album 