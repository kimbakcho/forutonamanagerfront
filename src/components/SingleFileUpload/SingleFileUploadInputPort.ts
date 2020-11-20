export default interface SingleFileUploadInputPort {
    hasFile(): boolean;
    getFile(): File | undefined;
    deleteFileUrl?: string;
    deleteFlag: boolean;
}