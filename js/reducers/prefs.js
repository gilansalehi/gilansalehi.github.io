const defaultState = {
	themeColors: {
		primary: '#ffaa00',
		secondary: '#800080',
		tertiary: '#333333',
	},
	navPos: {
		vPos: 'top',
		hPos: 'left',
	}
}

const initialState = localStorage.getItem('preferences') || defaultState;

export default function PreferencesReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_THEME_COLOR':
			const themeColors = { ...state.themeColors, ...payload };
			return { ...state, themeColors };
		case 'SET_NAV_POS':
			const navPos = { ...state.navPos, ...payload };
			return { ...state, ...navPos };
		case 'SAVE_PREFERENCES':
			window.localStorage.setItem('preferences', state);
			return state;
		case 'RESTORE_DEFAULTS':
			// window.localStorage.clear();
			return defaultState;
		default:
			return state;
	}
}