import Form from "./form";

export default interface Application {
    _id: string;
    form: Form['_id'];
    user: string;
    createdAt: number;
    status: "pending" | "approved" | "rejected";
    comments: Comment[];
    answers: {
        [key: string]: string;
    }
}