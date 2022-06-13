export default interface FormPermission {
    [key: string]: {
        create?: boolean;
        viewOthers?: boolean;
        comment?: boolean;
    }
}