import { q } from './reduxLite.js';

export default class Template {
	constructor(fragments, args) {
		this._template = this.buildEmptyTemplate(fragments, args);
		this._state = args;
		// this._state = {};
		// this._children = args.flat().filter(arg => arg instanceof Template);
		// args.flat().filter(arg => !(arg instanceof Template)).map((arg, idx) => {
		// 	if (typeof arg === 'function') {
		// 		this._state[idx] = arg;
		// 	}
		// });
	}

	buildEmptyTemplate(fragments, args) {
		const temp = document.createElement('template');
		const templateId = 'template__' + window.uuid++;
		temp.setAttribute('id', templateId);
		let templateString = '';
		for (var i = 0; i < fragments.length; i++) {
			templateString += fragments[i].trim();
			templateString += `|||${i}|||`;
		}
		temp.innerHTML = templateString;
		return temp;
	}

	update(newState) {
		if (newState !== undefined && newState !== this._state) {
			// do a little diff maybe
			this.render(newState);
		}
	}

	render(oldHTML, newState) {
		let t = this._template.content.cloneNode(true);
		// t.children[0].attributes

	}
}