<template>
  <div>
    <VueEditor
        ref="vueEditorConstructor"
        :editor-options="quillEditSetting"
        v-model="content"
    ></VueEditor>

  </div>
</template>

<script lang="ts">
import ImageResize from "quill-image-resize-module";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";

// eslint-disable-next-line no-unused-vars
import { VueEditor, Quill, VueEditorConstructor } from "vue2-editor";

@Component({
  components: {
    VueEditor
  }
})
export default class QuillBasicEditor extends Vue {

  @Ref("vueEditorConstructor")
  _vueEditorConstructor!: VueEditorConstructor;


  @Prop(String)
  value!: string

  content: string = "";


  created() {
    Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
    Quill.register("modules/imageResize", ImageResize);
  }

  quillEditSetting = {
    modules: {
      imageDropAndPaste: {
        handler: this.quillEditSettingImageHandler,
      },
      imageResize: true,
    },
  };

  // eslint-disable-next-line no-unused-vars
  quillEditSettingImageHandler(imageDataUrl: any, type: any) {
    if (this._vueEditorConstructor !== undefined) {
      const quill = this._vueEditorConstructor.$data.quill;
      const range = quill.getSelection();
      if (range != null) {
        quill.insertEmbed(range.index, "image", imageDataUrl);
      }
    }
  }

  @Watch("content")
  changeContent(value: string): void{
    this.$emit("input",value)
  }

  @Watch("value")
  changeValue(value: string): void{
    this.content = value;
  }
}
</script>

<style scoped>

</style>