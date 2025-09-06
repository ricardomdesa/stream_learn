import { ModulosData } from "@/types";
import { GetModulosResponse } from "@/domain/requests";
import { Course } from "@/lib/types";

export function GetModulosDTO(data: GetModulosResponse): ModulosData{
    return {
        modulos: data.modulos.map((item) => ({
            name: item.name,
            folder: item.folder,
            videos: item.videos.map((video) => video),
        })),
    };
}

export function GetCourseDTO(data: Course): Course[]{
    return [{
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        modulos: data.modulos.map((module) => ({
            id: module.id,
            title: module.title,
            lessons: module.lessons.map((lesson) => lesson), // Ensure lesson is of type Lesson
        })),
    }];
}