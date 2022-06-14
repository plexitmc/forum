export default interface FormField {
    _id: string;
    type: 'text' | 'heading' | 'shorttext' | 'longtext' | 'select' | 'checkbox';
    label: string;
    description?: string;
    required?: boolean;
    options?: string[]
}