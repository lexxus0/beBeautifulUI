import Link from "next/link";
import clsx from "clsx";
import Icon from "@/components/shared/Icon";

type UserIconProps = {
  onClose?: () => void;
  className?: string;
};

export default function UserIcon({ onClose, className }: UserIconProps) {
  return (
    <Link
      href="/auth"
      onClick={onClose}
      className={clsx(
        "w-[38px] h-[38px]",
        "border border-black-10 rounded-lg flex items-center justify-center",
        "transition-all duration-300 ease-in-out hover:border-gray-10 hover:text-gray-10",
        className
      )}
    >
      <Icon name="icon-user" className="w-[25px] h-[30px]" />
    </Link>
  );
}
