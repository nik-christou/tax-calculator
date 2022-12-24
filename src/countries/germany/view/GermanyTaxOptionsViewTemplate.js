import {html} from "lit";

const GermanTaxOptionsViewTemplate = (married, withChildren) => html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Marital status</h5>
                </div>
                <div>
                    <div class="btn-group">
                        <input id="single-status" name="marital-status" type="radio" class="btn-check" autocomplete="off" ?checked=${!married}>
                        <label class="btn btn-outline-primary" for="single-status">Single</label>
                        <input id="married-status" name="marital-status" type="radio" class="btn-check" autocomplete="off" ?checked=${married}>
                        <label class="btn btn-outline-primary" for="married-status">Married</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Parental status</h5>
                </div>
                <div>
                    <div class="btn-group">
                        <input id="no-children" name="parental-status" type="radio" class="btn-check" autocomplete="off" ?checked=${!withChildren}>
                        <label class="btn btn-outline-primary" for="no-children">No children</label>
                        <input id="with-children" name="parental-status" type="radio" class="btn-check" autocomplete="off" ?checked=${withChildren}>
                        <label class="btn btn-outline-primary" for="with-children">With children</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export { GermanTaxOptionsViewTemplate };
