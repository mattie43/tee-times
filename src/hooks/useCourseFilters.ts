import { useSearchParams, useRouter } from "next/navigation";

export default function useCourseFilters() {
  const key = "course_filters";
  const searchParams = useSearchParams();
  const courseFilterParam = searchParams.get(key)?.split(",") ?? [];
  const router = useRouter();

  const setCourseFiltersParam = (courseId: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (courseFilterParam.includes(courseId)) {
      if (courseFilterParam.length === 1) {
        newParams.delete(key);
        return router.push(`?${newParams.toString()}`);
      } else {
        const newList = courseFilterParam.filter((c) => c !== courseId);
        newParams.set(key, newList.join(","));
        return router.push(`?${newParams.toString()}`);
      }
    } else {
      newParams.set(key, [...courseFilterParam, courseId].join(","));
      return router.push(`?${newParams.toString()}`);
    }
  };

  return [courseFilterParam, setCourseFiltersParam] as const;
}
