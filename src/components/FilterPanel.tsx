import { MONMOUTH_COURSES } from "@/constants/courses";
import DatePicker from "./DatePicker";
import Button from "@/ui/button";
import useCourseFilters from "@/hooks/useCourseFilters";

export default function FilterPanel() {
  const [courseFiltersParam, setCourseFiltersParam] = useCourseFilters();

  return (
    <div className="flex flex-col gap-4 border-r-2 p-4 items-center">
      <DatePicker />
      <span className="text-foreground/80 text-xs">
        Select courses to filter by
      </span>
      <div className="flex flex-col">
        {MONMOUTH_COURSES.map((course) => (
          <Button
            key={course.name}
            variant="text"
            className={`w-full
            ${
              courseFiltersParam.length > 0
                ? courseFiltersParam.includes(`${course.booking_class}`)
                  ? "text-green-400"
                  : "text-red-400"
                : "text-foreground"
            }
          `}
            onClick={() => setCourseFiltersParam(`${course.booking_class}`)}
          >
            {course.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
