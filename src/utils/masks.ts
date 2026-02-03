import { MaskitoOptions } from "@maskito/core";

export const cpfMaskInput: MaskitoOptions = {
    mask: [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ],
};

export const cnpjMaskInput: MaskitoOptions = {
    mask: [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ],
};

export const cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
};

export const phoneMask: MaskitoOptions = {
    mask: [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ],
};

export const serializableCPF = (value: string) => {
    const clean = value.replace(/\D/g, "");

    return clean.replace(/^(\d{3})\d{6}(\d{2})$/, "$1.*******-$2");
};

export const serializableCNPJ = (value: string) => {
    const clean = value.replace(/\D/g, "");

    return clean.replace(/^(\d{2})\d{6}(\d{4})(\d{2})$/, "$1.*******/$2-$3");
};

export const maskCPF = (value: string) => {
    const clean = value.replace(/\D/g, "");

    return clean.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

export const maskCNPJ = (value: string) => {
    const clean = value.replace(/\D/g, "");

    return clean.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5",
    );
};
