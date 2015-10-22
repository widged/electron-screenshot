/* jshint esnext: true */

var sha1 = require('sha1');
var remote = require('' + 'remote');

captureList([
	"http://google.com",
  "http://github.com"
], {snapDelay: 2000}, function(url, img) {
	var png = img.toPng();
	var sha = sha1(url);
	var filename = `snapshots/raw_${sha}.png`;
	remote.require('fs').writeFile(filename, png, function() {
		console.log(`[saved] ${url} as ${filename}`);
	});
});

function openWindow() {
	var BrowserWindow = remote.require('browser-window');
	let win = new BrowserWindow({ width: 1024, height: 768, show: false });
	win.on('closed', function() { win = null; });
	win.show();
	return win;
}

function screenshot(win, opt, asyncReturn) {
	if(typeof asyncReturn !== 'function') { return asyncReturn(); }
	var remote = require('' + 'remote') // prevent static analysis like browserify
	setTimeout(function() {
		win.capturePage(asyncReturn);
	}, opt.delay)
}

function captureList(urls, {snapDelay}, onSnapped) {
	var win;
	loadUrlInSnapWindow(urls.shift());
	function loadUrlInSnapWindow(url) {
		if(!win) { win = openWindow(); }
		win.loadUrl(url);
		screenshot(win, {delay: snapDelay}, function(img) {
			onSnapped(url, img);
			if(urls.length) {
				loadUrlInSnapWindow(urls.shift());
			} else {
				win.close(); win = null;
				console.log('[DONE]')
			}
		});
	}
}
