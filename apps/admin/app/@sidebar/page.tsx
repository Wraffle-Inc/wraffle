import SideBar from './_components/SideBar';

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-start justify-between bg-white'>
      <div className='h-full w-[14%] min-w-[240px]'>
        <SideBar />
      </div>
    </main>
  );
}
