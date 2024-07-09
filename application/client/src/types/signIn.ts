interface SignUpData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

interface ErrorResponse {
    error: string;
}

export type {SignUpData, ErrorResponse};
