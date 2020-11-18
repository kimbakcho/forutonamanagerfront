declare module "quill-image-resize-module";
declare module "quill-image-drop-and-paste";
declare module "vue-google-autocomplete";
declare module "vue2-editor" {
    import { VueConstructor } from "vue";
    import { DirectiveOptions } from "vue/types/options";
    import quill from "Quill";
    export const Quill: any;

    export default VueEditor;
    export const VueEditor: VueEditorConstructor;

    export interface VueEditorProps {
        id: string;
        placeholder: string;
        value: string;
        disabled: boolean;
        editorToolbar: any[];
        editorOptions: any;
        useCustomImageHandler: any;
        useMarkdownShortcuts: boolean;
    }

    export interface VueEditorData {
        quill: quill;
    }

    export interface VueEditorWatch {
        value: (val: any) => void;
        disabled: (status: boolean) => void;
    }

    export interface VueEditorMethods {
        initializeEditor: () => void;
        setupQuillEditor: () => void;
        setModules: () => void;
        prepareEditorConfig: (editorConfig: any) => void;
        registerPrototypes: () => void;
        registerEditorEventListeners: () => void;
        listenForEditorEvent: (type: any) => void;
        handleInitialContent: () => void;
        handleSelectionChange: (range: any, oldRange: any) => void;
        handleTextChange: () => void;
        checkForCustomImageHandler: () => void;
        setupCustomImageHandler: () => void;
        customImageHandler: (image: any, callback: any) => void;
        emitImageInfo: ($event: Event) => void;
    }

    export interface VueEditorConstructor extends VueConstructor {
        props: VueEditorProps;
        data: () => VueEditorData;
        $data: VueEditorData;
        watch: VueEditorWatch;
        methods: VueEditorMethods;
    }
}
