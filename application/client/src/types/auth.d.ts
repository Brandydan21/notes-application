import { User } from "./users";

type authContextType = {
    user: User | null;
    signIn: (user: User) => void;
    signOut: () => void;
};

export type {authContextType};