import {fetchCourses} from "@/actions/fetchCourses";
import {ICourse} from "@/interfaces/course";
import CoursesGroup from "@/components/CoursesGroup";


export default async function Index() {
  const courses: ICourse[] | null = await fetchCourses();
  console.log('courses', courses);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <CoursesGroup data={courses} />
    </div>
  );
}
