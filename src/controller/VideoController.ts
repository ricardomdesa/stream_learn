
import { GetCourseDTO } from "@/domain/dtos/modulos";
import { api } from "@/external_interface/api";
import { Course } from "@/lib/types";

export class VideoController {
  public static async getClasses(token: string) {
    const request = new Request(
      `${process.env.NEXT_PUBLIC_API}/classes`,
      {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    const response = await api(request);
    if (response.status === 200) {
      const resp = (await response.json()) as Course;
      return GetCourseDTO(resp);
    }
    return [] as Course[];
  }
}
