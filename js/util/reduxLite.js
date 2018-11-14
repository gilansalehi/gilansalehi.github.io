// REDUX LITE:
window.uuid = 0;
window.templateArgs = {};
const combineReducers = obj => {
	return function (state, action) {
		let nextState = {};
		Object.keys(obj).map(key => {
			if (state) {
				nextState[key] = obj[key](state[key], action);
			} else {
				// handle init:
				nextState[key] = obj[key](undefined, {});
			}
		});
		return nextState;
	}
};

const createStore = (rootReducer, initialState, options = {}) => {
	var store = {
		rootReducer,
		components: {},
		registerComponents(obj) {
			Object.assign(this.components, obj);
		},
		templates: {},
		templateArgs: {},
		registerTemplates(obj) {
			Object.assign(this.templates, obj);
		},
		on(eventName, ...options) {
			var selector = options.filter(x => typeof x === 'string')[0]; // delegateTarget
			var callback = options.filter(x => typeof x === 'function')[0]; // middleware
			window.addEventListener(eventName, bindEvent(eventName, selector, callback));
		},
		queue: [],
		state: rootReducer(initialState, {}),
		dispatch(action) {
			const { state, rootReducer, queue } = this;
			this.state = rootReducer(state, action);

			queue.push(action);
			window.setTimeout(function () {
				if (this.queue.length) {
					this.queue = [];
					this.update(this.state);
				}
			}.bind(this), 0);
		},
		update: function(state) {
			Object.entries(this.components).map(([component, fn]) => {
				q(`[component="${component}"]`).map(el => fn(el, state));
			});
			Object.entries(this.templates).map(([templateName, templateObject]) => {
				q(`[template="${templateName}"]`).map(el => {
					debugger;
					el.innerHTML = templateObject.render();
				});
			});
		},
	};
	return Object.assign(store, options);
};

const chain = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const q = selector => [...document.querySelectorAll(selector)];
const deriveInitialState = (rootNode, selector) => {
	// TODO;
};
const template = (fragments, ...args) => {
	const temp = document.createElement('template');
	const templateId = window.uuid++;
	let templateString = '';
	for (var i = 0; i < fragments.length; i++) {
		templateString += fragments[i];
		templateString += `|||${templateId}__${i}|||`;
	}
	const templateArgs = args.concat('').map(arg => x => arg);

	return {
		id: templateId,
		templateString,
		templateArgs,
		render(templateArgs) {
			return this.templateString.split('|||').map(function(item, idx) {
				return !(idx % 2) ? item : this.templateArgs[Math.floor(idx / 2)]();
			}.bind(this)).join('');
		},
	};
}

export {
	chain,
	q,
	combineReducers,
	createStore,
	template,
	deriveInitialState,
};

// PRIVATE:
const bindEvent = (eventName, selector, callback) => function (evt) {
	const target = selector ? matchDelegate(evt.target, selector) : evt.target;
	if ( !target ) return false; // evt does not apply to us
	const types = target.getAttribute && target.getAttribute(`on-${eventName}`);
	const payload = target.dataset;
	if ( selector ) evt.delegateTarget = target;

	callback && callback(evt, { target, types, payload });
	types && types.split(' ').map(type => app.dispatch({ type, payload }));
};

const matchDelegate = (el, selector) => {
	if ( !el.parentNode ) return null;
	if ( el.matches(selector) ) return el;
	return matchDelegate(el.parentNode, selector);
}

const typeOf = (arg) => {
	return Array.isArray(arg) ? 'array' : typeof arg;
};