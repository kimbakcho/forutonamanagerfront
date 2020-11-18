export default  interface ImageUploaderFileComponentInputPort{
    hasImage(): boolean;
    getFiles(): File;
    hasFiles(): boolean;
}