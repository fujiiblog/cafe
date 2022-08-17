$(function() {
	var navLink = $('#link li a');
	// ナビゲーションのリンクを指定
	var contentsArr = new Array();
	for (var i = 0; i < navLink.length; i++) {
	// 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
		var targetContents = navLink.eq(i).attr('href');
		// コンテンツのIDを取得
		if(targetContents.charAt(0) == '#') {
		// ページ内リンクでないナビゲーションが含まれている場合は除外する
			var targetContentsTop = $(targetContents).offset().top;
			// ページ上部からコンテンツの開始位置までの距離を取得
			var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
			// 配列に格納
			contentsArr[i] = [targetContentsTop, targetContentsBottom]
		}
	};
	function currentCheck() {
	// 現在地をチェックする
		var windowScrolltop = $(window).scrollTop();
		// 現在のスクロール位置を取得
		for (var i = 0; i < contentsArr.length; i++) {
			if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= 
windowScrolltop) {
// 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
				navLink.removeClass('current');
				navLink.eq(i).addClass('current');
		// 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
				i == contentsArr.length;
			}
		};
	}
	$(window).on('load scroll', function() {
	// ページ読み込み時とスクロール時に、現在地をチェックする
		currentCheck();
	});
	navLink.click(function() {
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1000,'easeOutCirc');
		// ナビゲーションをクリックした時のスムーズスクロール
		return true;
	})
});