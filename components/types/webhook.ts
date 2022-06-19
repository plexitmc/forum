export default interface Webhook {
    _id: string;  
    name: string;
    url: string;
    type: 'all' | 'onComment';
    secret: string;
}