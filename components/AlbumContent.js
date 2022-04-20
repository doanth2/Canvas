import dynamic from 'next/dynamic';
import React, {useState} from 'react'
import UploadImage from './sections/UploadImage'
import TurnImage from './sections/TurnImage'
import Album from './sections/Album'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
}));

export default function AlbumContent() {
  const classes = useStyles();
  // const [openStamp, setOpenStamp] = useState(false);
  // const [drangDrop, setDragDrop] = useState([])
  const [listImage, setListImage] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  return (
    <div className={classes.container}>
      <Album/>

{/* 
      <UploadImage listImage={listImage}
       setListImage={setListImage} setSelectedImage={setSelectedImage} />
      <TurnImage selectedImage={selectedImage} setSelectedImage = {setSelectedImage } /> */}

    </div>
  )
}
