import Form from "./form";

export default interface Application {
    _id: string;
    type: Form['_id'];
    user: string;
    createdAt: number;
    status: "pending" | "approved" | "rejected";
    comments: Comment[];
    answers: {
        [key: string]: string;
    }
}