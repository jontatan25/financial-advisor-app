// This declaration file tells TypeScript that any .vue file will be treated as a Vue component 

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}