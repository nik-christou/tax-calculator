import { BaseElementCss } from "./BaseElementCss.js";

export const BaseElementMixin = superclass =>
    class extends superclass {
        static get styles() {
            return [BaseElementCss];
        }
    };
