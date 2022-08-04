const cloneAttributes = (target: Element, source: Element) => {
	[...source.attributes].forEach((attr) => {
		target.setAttribute(attr.nodeName, attr.nodeValue ?? '');
	});
};

/*
	To prevent cms problems with custom html tags. Existing html tag will be used with custom data attributes,
	this script will then convert the 'normal' html tag with a custom one.
*/
const customElementFallback = () => {
	const sourceNodes = document.querySelectorAll('[data-my-wiki-el]');

	sourceNodes.forEach((sourceNode) => {
		const targetNode = document.createElement('my-element');

		cloneAttributes(targetNode, sourceNode);

		if (sourceNode?.parentNode) {
			sourceNode.parentNode.replaceChild(targetNode, sourceNode);
		}
	});
};

customElementFallback();

export {};
