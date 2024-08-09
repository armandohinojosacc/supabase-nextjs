import {createClient} from "@/utils/supabase/client";

type params = {
  course1Id: string, course2Id: string, order1: number, order2: number
}
export async function updateOrder({course1Id, course2Id, order1, order2} : params) {
  try {
    const supabase = createClient();

    const { error: errorAux, data: dataAux } = await supabase
      .from('course')
      .update({ order: 0 })
      .eq('id', course1Id);

    const { error: error2 } = await supabase
      .from('course')
      .update({ order: order1 })
      .eq('id', course2Id);

    const { error: error1 } = await supabase
      .from('course')
      .update({ order: order2 })
      .eq('id', course1Id);

    return true;
  } catch (e) {
    return false;
  }
}
