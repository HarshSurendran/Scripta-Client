export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    shortName: string;
    email: string;
    phone: number;
    dob?: Date;
    image: string;
    interestedCategories: string[];
}

export interface UserState {
    _id?: string;
    firstName: string;
    lastName: string;
    shortName: string;
    email: string;
    phone: number;
    dob: string;
    image: string;
    interestedCategories: string[];
    isAuthenticated: boolean;
}