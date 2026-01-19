"use server";

export type ImageType = {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
};

export const getImageList = async (): Promise<ImageType[]> => {
    const response = await fetch("https://picsum.photos/v2/list", {
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["images"],
        },
    });

    const data = (await response.json()) as ImageType[];

    return data;
};
