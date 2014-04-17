function compare(a) {
	if (a == null)
		return;

	if (a == undefined)
		return;

	if (a == 0)
		return;

	if (a == "")
		return;

	if (a == false)
		return;

	if (a == true)
		return;

	if (a === false)
		return;

	if (a == "Hello, World")
		return;
}

function compare2(a) {
	if (a != null)
		return;

	if (a != undefined)
		return;

	if (a != 0)
		return;

	if (a != "")
		return;

	if (a != false)
		return;

	if (a != true)
		return;

	if (a !== false)
		return;

	if (a != "Hello, World")
		return;
}
