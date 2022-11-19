import { useState } from "react";

interface IFormValues {
    input: string;
    checkbox: boolean;
    radio: string;
    textarea: string;
    select: string;
}

export interface IFormProps {
    values: IFormValues;

    handleChange: (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => void;
}

const FormView = (props: IFormProps) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="formInputText">Text</label>
                <input value={props.values.input} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="formInputText" />
            </div>
            <div className="form-group form-check">
                <input checked={props.values.checkbox} onChange={(e) => props.handleChange(e.target)} type="checkbox" className="form-check-input" id="formInputCheckBox" />
                <label className="form-check-label" htmlFor="formInputCheckBox">CheckBox</label>
            </div>

            <div className="form-check">
                <input checked={props.values.radio === 'checked1'} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="formInputRadio1" value="checked1" />
                <label className="form-check-label" htmlFor="formInputRadio1">
                    Radio 1
                </label>
            </div>
            <div className="form-check">
                <input checked={props.values.radio === 'checked2'} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio"id="formInputRadio2" value="checked2" />
                <label className="form-check-label" htmlFor="formInputRadio2">
                    Radio 2
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="formTextArea">Textarea</label>
                <textarea value={props.values.textarea} onChange={(e) => props.handleChange(e.target)} className="form-control" id="formTextArea" rows={3}></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="formSelect">Example select</label>
                <select value={props.values.select} onChange={(e) => props.handleChange(e.target)} className="form-control" id="formSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
const initialFormValues: IFormValues = {
    input: '',
    checkbox: false,
    radio: '',
    textarea: '',
    select: '',
};



const PageForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        // todo: update form value
        console.log(target);

        if (target.id === 'formInputText') {
            setFormValues({ ...formValues, input: target.value });
            return;
        }
        if (target.id === 'formInputCheckBox') {
            setFormValues({ ...formValues, checkbox: (target as HTMLInputElement).checked });
            return;
        }
        if (target.id === 'formInputRadio1') {
            setFormValues({ ...formValues, radio: (target as HTMLInputElement).value });
            return;
        }
        if (target.id === 'formInputRadio2') {
            setFormValues({ ...formValues, radio: (target as HTMLInputElement).value });
            return;
        }
        if (target.id === 'formTextArea') {
            setFormValues({ ...formValues, textarea: target.value });
            return;
        }
        if (target.id === 'formSelect') {
            setFormValues({ ...formValues, select: target.value });
            return;
        }
    }


    return <FormView values={formValues} handleChange={handleChange} />
};

export default PageForm;