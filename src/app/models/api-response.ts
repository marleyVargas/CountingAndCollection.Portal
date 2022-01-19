export class ApiResponse<T> {
    constructor(
        public error: boolean,
        public data: T,
        public message: string,
    ) {}
}

