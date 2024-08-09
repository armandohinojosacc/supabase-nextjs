'use client';

import {useRouter} from "next/navigation";

import {ICourse} from '@/interfaces/course'
import {updateOrder} from "@/actions/updateOrder";
import {useState} from "react";

export default function CoursesGroup({data}: { data: ICourse[] | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState<number | null>(null);

  const changeOrder = async (courseIdx: number, mode: number) => {
    if (data) {
      setLoading(() => true);
      setIndexLoading(() => courseIdx);

      const current = data[courseIdx];
      const newPosition = mode === 1 ? data[courseIdx - 1] : data[courseIdx + 1];

      const updated = await updateOrder({
        course1Id: current.id,
        course2Id: newPosition.id,
        order1: current.order,
        order2: newPosition.order
      });
      setLoading(() => false);
      setIndexLoading(() => null);


      if (updated) {
        return router.refresh();
      }

      alert('Ops');
    }
  }

  return (<>
    <h1 className="my-10">Courses</h1>
    <table className="border border-solid border-white table-auto">
      <thead>
      <tr className="text-center font-bold">
        <td>Order</td>
        <td>Title</td>
        <td>Description</td>
        <td>Instructur Name</td>
      </tr>
      </thead>
      <tbody>
      {
        data?.map((course, courseIdx) => (
          <tr key={course.id} className="group border border-solid border-white hover:bg-white hover:text-black">
            <td className="text-center">{course.order}</td>
            <td className="px-6 py-2">{course.title}</td>
            <td className="line-clamp-1 w-[600px] mt-2">{course.description}</td>
            <td className="px-6 py-2">{course.instructor_name}</td>
            <td className="flex justify-center space-y-2 flex-col">
              {
                indexLoading !== courseIdx && (
                  <>
                    {courseIdx !== 0 && <button disabled={loading}
                                                className="w-[100px] border border-solid rounded-full group-hover:border-solid group-hover:border-black group-hover:text-black"
                                                onClick={() => changeOrder(courseIdx, 1)}>Up</button>}
                    {courseIdx !== data?.length - 1 &&
                      <button disabled={loading}
                              className="w-[100px] border border-solid rounded-full group-hover:border-solid group-hover:border-black group-hover:text-black"
                              onClick={() => changeOrder(courseIdx, 0)}>Down</button>}</>
                )
              }
              {
                loading && indexLoading === courseIdx && (
                  <small className="text-center px-2">Changing position!!</small>)
              }
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  </>);
}
