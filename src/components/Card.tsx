import to12Hour from "@/utils/to12Hour";
import { PiGolf } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import {
  LuClock1,
  LuClock2,
  LuClock3,
  LuClock4,
  LuClock5,
  LuClock6,
  LuClock7,
  LuClock8,
  LuClock9,
  LuClock10,
  LuClock11,
  LuClock12,
} from "react-icons/lu";
import Button from "@/ui/button";

const ICON_MAP: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  "1": LuClock1,
  "2": LuClock2,
  "3": LuClock3,
  "4": LuClock4,
  "5": LuClock5,
  "6": LuClock6,
  "7": LuClock7,
  "8": LuClock8,
  "9": LuClock9,
  "10": LuClock10,
  "11": LuClock11,
  "12": LuClock12,
};

export default function Card({ teeTime }: any) {
  const time = to12Hour(teeTime.time.split(" ")[1]);
  const Icon = ICON_MAP[time.split(":")[0]];

  const handleOpen = () => {
    window.open(teeTime.book_url, "_blank");
  };

  return (
    <div className="flex flex-col gap-2 p-2 border border-foreground rounded-sm h-fit min-w-[250px]">
      <span className="flex gap-1 text-pastel-red justify-center">
        <PiGolf style={{ transform: "translateY(3px)" }} />
        {teeTime.course_name}
      </span>
      <div className="flex justify-between">
        <span className="flex gap-1 text-pastel-orange">
          <Icon style={{ transform: "translateY(3px)" }} />
          <span>{time}</span>
        </span>
        <span className="flex gap-1 text-pastel-green">
          {teeTime.available_spots}
          <IoPeopleOutline style={{ transform: "translateY(3px)" }} />
        </span>
      </div>
      <Button onClick={handleOpen}>Book now</Button>
    </div>
  );
}
