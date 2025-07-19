import Image from "next/image";

const LogoIcon = ({ props }: { props?: string }) => {
  return (
    <Image
      className={`h-12 w-12 object-contain ${props}`}
      src="/drismalizer.png"
      alt="logo"
      width={500}
      height={500}
    />
  );
};

export default LogoIcon;
