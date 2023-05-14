import { trimSpace } from '../utils/tools';

export default ($) => {
	// 获取元素
	const $headerSearch = $('.J_headerSearch'),
	      $searchInput = $headerSearch.children('input'),
	      $searchBtn = $headerSearch.children('button');

	const init = () => {
		bindEvent();
	}

	function bindEvent () {
		$searchBtn.on('click', onSearchAction);
	}

	// click btn
	function onSearchAction () {
		const val = trimSpace($searchInput.val());

		if (val.length === 0) {
			return;
		}

		window.open('/list/' + val);
		$searchInput.val('');
	}

	return {
		init
	}
}