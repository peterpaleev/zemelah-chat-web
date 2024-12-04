import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' 
  ? `/${process.env.NEXT_PUBLIC_REPO_NAME}` 
  : '';

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="bottom-0 left-0 mb-4 flex h-auto w-full items-end justify-center bg-gradient-to-t via-white  lg:static lg:w-auto lg:bg-none lg:mb-0">
        <a
          href="https://www.zemelah.online/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <span>Умный поиск по базе Земелах</span>
          <div className="relative">
            <Image
              className="rounded-xl"
              src={`${basePath}/zemelah-logo.png`}
              alt="Zemelah Logo"
              width={40}
              height={40}
              priority
            />
            <span className="absolute -top-2 -right-10 text-xs font-bold text-gray-500">BETA</span>
          </div>
        </a>
      </div>
    </div>
  );
}
