import Image from "next/image";

async function getDAta() {
  const res = await fetch("");
  const data = await res.json();
  console.log(data);
  return data;
}
export default function Home() {
  const;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a>helo world</a>
    </div>
  );
}
