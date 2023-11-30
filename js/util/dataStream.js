// elements will be marked with data-binding='{ "text": "docTitle", "class": { "open": "navIsOpen" } }'.
// data will come in the shape of an object, { "navIsOpen": true, "docTitle": "coolDoc" }.
// need to see when the data object has a key that is the leaf prop of the config object
// if so, update the relevant property on the element.

const DATA_MAP = window.dataMap = {};

function render(data) {
    for ( const [key, value] of Object.entries(data) ) {
        const elements = DATA_MAP[key];
        elements.forEach(el => {
            update(el, data);
        });
    }
}

export function renderDataStream(data) { render(data); console.log(data); }

function update(element, data) {
    const config = JSON.parse(element.dataset.binding);

    for ( const [attr, value] of Object.entries(config) ) {
        switch (attr) {
            case 'class': {
                for ( const [className, toggleName] of Object.entries(value) ) {
                    if (Object.hasOwn(data, toggleName)) {
                        element.classList.toggle(className, data[toggleName]);
                    }
                }
                break;
            }
            default: {
                if (Object.hasOwn(data, value)) {
                    element[_propMap(attr)] = data[value];
                }
                break;
            }
        }
    }
}

export function initDataStream(ctx = document) { init(ctx) }

function init(ctx = document) {
    ctx.querySelectorAll('[data-binding]').forEach(element => {
        const config = JSON.parse(element.dataset.binding);

        for ( const [key, value] of Object.entries(config) ) {
            switch (key) {
                case 'class': {
                    for (let [className, classValueName] of Object.entries(value) ) {
                        DATA_MAP[classValueName] = DATA_MAP[classValueName] || [];
                        DATA_MAP[classValueName].push(element);
                    }
                    break;
                }
                default: {
                    DATA_MAP[value] = DATA_MAP[value] || [];
                    DATA_MAP[value].push(element);
                    break;
                }
            }
        }
    });
}

function _propMap(prop) {
    const propMap = {
        text: 'textContent',
        class: 'classList',
    };
    return propMap[prop] || prop;
}
