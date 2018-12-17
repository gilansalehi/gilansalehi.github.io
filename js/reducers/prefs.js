const initialState = {
	themeColors: {
		primary: '#fa0',
		secondary: '#808',
		tertiary: '',
	}
}

export default function PreferencesReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_THEME_COLOR':
			return [...state, payload];
		case 'SET_NAV_POS':
			return state.filter(todo => todo.key !== payload);
		default:
			return state;
	}
}