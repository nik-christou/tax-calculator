import {LitElement} from 'lit';
import {BaseElementCss} from './BaseElementCss.js';
import {RebootCssTaggedTemplate} from '@twbs-css/template-literals';
import {TypeCssTaggedTemplate} from '@twbs-css/template-literals';

export class BaseElement extends LitElement {

    static styles = [
        RebootCssTaggedTemplate,
        TypeCssTaggedTemplate,
        BaseElementCss
    ];

    constructor() {
        super();
    }
}