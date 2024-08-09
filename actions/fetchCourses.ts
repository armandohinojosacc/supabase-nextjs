'use server';

import {createClient} from "@/utils/supabase/server";

export async function fetchCourses() {
  const supabase = createClient();
  const {data: courses} = await supabase.from("course").select().order('order');

  return courses;
}
