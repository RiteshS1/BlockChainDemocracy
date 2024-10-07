// src/utils/validators.ts
export const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isEmpty = (value: string) => {
    return value.trim() === '';
};
