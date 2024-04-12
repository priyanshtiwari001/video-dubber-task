import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-2 border-white  h-14">
      <div className="flex gap-3 items-center justify-center">
        <h1 className="text-4xl   text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          VideoDubber
        </h1>
        <Image
          src="https://cdn.jsdelivr.net/gh/souvic/autodubber/assets/autodubber-logo-1.svg"
          width={80}
          height={80}
          alt="logo"
        />
      </div>
    </nav>
  );
};
export default Navbar;
