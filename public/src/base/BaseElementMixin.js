import { BaseElementCss } from "./BaseElementCss.js";
import { NormalizeCss } from "./NormalizeCss.js";

export const BaseElementMixin = (superclass) =>
    class extends superclass {
        static get styles() {
            return [BaseElementCss, NormalizeCss];
        }
    };
