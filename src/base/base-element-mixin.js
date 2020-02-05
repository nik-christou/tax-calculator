import { BaseElementCss } from './base-element.css.js';

export const BaseElementMixin = superclass =>

  class extends superclass {

    static get styles() {
      return [BaseElementCss];
    }
}
