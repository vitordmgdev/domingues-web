import { customAlphabet } from "nanoid";

const publicId = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    12,
);

export function generatePublicId() {
    const id = publicId();

    return id;
}
