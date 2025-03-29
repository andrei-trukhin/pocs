
import { lusitana } from '@/app/ui/fonts';
import {ActivityIcon} from "lucide-react";

export default function ReportsLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <ActivityIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[33px]">Reports</p>
    </div>
  );
}
