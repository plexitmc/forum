export default interface User {
    id: string;
    username: string;
    avatar: string;
    createdAt: number,
    role?: string;
    owner?: boolean;      
}