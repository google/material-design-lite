(function() {
	Array.prototype.forEach.call(document.querySelectorAll('[data-target]'), function(el) {
		var target = el.getAttribute('data-target');
		el.addEventListener('click', function() {
			location.href = target;
		});
	});
})();
