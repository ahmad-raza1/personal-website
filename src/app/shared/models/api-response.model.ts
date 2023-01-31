import { Data } from "./data.model";

export class ApiResponse {
    code: number;
    message: string;
    data: Data | null;

    constructor() {
        this.code = 0;
        this.message = "";
        this.data = null;
    }
}
