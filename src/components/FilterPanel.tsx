import { MONMOUTH_COURSES } from "@/constants/courses";
import DatePicker from "./DatePicker";
import Button from "@/ui/button";
import useCourseFilters from "@/hooks/useCourseFilters";

export default function FilterPanel() {
  const [courseFiltersParam, setCourseFiltersParam] = useCourseFilters();

  return (
    <div className="flex flex-col border-r-2 p-4 items-center">
      <DatePicker />
      <span className="text-gray-400 text-xs my-4">
        Select to filter by course
      </span>
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
                : "text-white"
            }
          `}
          onClick={() => setCourseFiltersParam(`${course.booking_class}`)}
        >
          {course.name}
        </Button>
      ))}
    </div>
  );
}
