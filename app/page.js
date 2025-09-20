import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center mt-5 gap-5 p-2">
      <h1 className="md:text-8xl text-4xl font-extrabold text-[#0464C4]">JARURAT CARE</h1>
      <h2 className="md:text-4xl text-2xl font-semibold text-white/80">Jaisi Jarurat Vaisi Care</h2>
      <p className="md:text-xl text-lg text-[#2b2b2b] p-4 rounded-lg bg-white/30 text-center md:w-1/2">Providing support, guidance, hope and personalized care for cancer patients and their families. Here to ensure you never face your journey alone.</p>
      <Link href="/patients"><button className="bg-[#132F78] hover:bg-[#0464C4] text-white font-bold py-2 px-4 rounded-full cursor-pointer">Check patient details</button></Link>
    </div>
  );
}
