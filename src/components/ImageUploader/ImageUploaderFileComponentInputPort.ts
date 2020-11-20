export default  interface ImageUploaderFileComponentInputPort{
    hasImage(): boolean;
    getFile(): File  | undefined;
    hasFile(): boolean;
    deleteFlag: boolean;
    deleteFileUrl?: string;
}