import {html} from "lit";

const GermanTaxOptionsViewTemplate = html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Marital status</h5>
                </div>
                <div>
                    <ul class="list-group list-group-horizontal marital-status-values">
                        <a id="single-status" class="list-group-item list-group-item-action active">Single</a>
                        <a id="married-status" class="list-group-item list-group-item-action">Married</a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Parental status</h5>
                </div>
                <div>
                    <ul class="list-group list-group-horizontal parental-status-values">
                        <a id="children" class="list-group-item list-group-item-action active">Children</a>
                        <a id="no-children" class="list-group-item list-group-item-action">No Children</a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

export { GermanTaxOptionsViewTemplate };
