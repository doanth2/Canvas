import dynamic from 'next/dynamic';
// import Photo from '../components/exproject/Photo'
// import AlbumContent from '../components/AlbumContent'
// import Index from '../components/KonvaDrag/index.js'

const Photo = dynamic(() => import('../components/exproject/Photo'), { ssr: false });


export default function Home() {
  return (
    <div>
      <Photo/>
      {/* <Photo/> */}
    {/* <AlbumContent/> */}

    </div>
  )
}
