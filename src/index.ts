/*
	To prevent cms problems with custom html tags. Existing html tag will be used with custom data attributes,
	this script will then convert the 'normal' html tag with a custom one.
*/

const customElementFallback = () => {
	const targetNodes = document.querySelectorAll('[data-my-wiki-el]');

	targetNodes.forEach((targetNode) => {
		const componentEl = document.createElement('my-element');

		if (targetNode?.parentNode) {
			targetNode.parentNode.replaceChild(componentEl, targetNode);
		}
	});
};

customElementFallback();
export {};
