import { template } from '../util/reduxLite.js';

export default template`
	<div template="FLIPPER" class="flip__container show-front grid-height-3 grid-width-3" on-click="FLIP">
		<div class="flip__content">
			<div class="flip__content--front">
				<!-- front -->
				${'<img class="profile" src="https://picsum.photos/200/350/?random">'}
			</div>
			<div class="flip__content--back">
				<!-- back -->
				${'<img class="grid-height-3 grid-width-3" src="https://picsum.photos/200/350/?random" />'}
			</div>
		</div>
	</div>
`;