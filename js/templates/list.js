import { template, txt } from '../util/reduxLite.js';

export default template`
	<ul>
		${'abc'.split('').map((item, i) => {
			return template`<li key=${i}>${txt(item)}</li>`;
		})}
	</ul>
`;
