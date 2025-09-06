

export type GetModulosResponse = {
    modulos: Array<{
        name: string;
        folder: string;
        videos: Array<string>;
    }>;
}
