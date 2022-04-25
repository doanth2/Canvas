import dynamic from 'next/dynamic';
const ClassReact = dynamic(() => import('../components/konva/ClassReact'), { ssr: false });

export default function Home() {
  return (
    <div>
      <ClassReact/>
    </div>
  )
}
