import { css } from 'lit';

export const MyElementStyle = css`
	:host {
		display: block;
		max-width: 800px;
		padding: 1em;
	}

	.wiki-input {
		margin-bottom: 2em;
	}

	.container {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		grid-column-gap: 1em;
		grid-row-gap: 1em;
	}

	.content {
		grid-area: content;
	}
	.content-title {
		margin-top: 0;
	}
	.thumbnail {
		grid-area: thumbnail;
	}
	.read-more {
		grid-area: read-more;
	}

	.no-img {
		grid-template-areas:
			'content'
			'read-more';
	}

	.img-left {
		grid-template-areas:
			'thumbnail content'
			'read-more read-more';
	}

	.img-right {
		grid-template-areas:
			'content thumbnail'
			'read-more read-more';
	}

	.img-bottom {
		grid-template-areas:
			'content'
			'thumbnail'
			'read-more';
	}

	.no-img {
		grid-template-areas:
			'content'
			'read-more';
	}

	.code-block {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 10px;
		margin-bottom: 2em;
		background: #eeeeee;
		border-radius: 0.3em;
	}

	.btn-code-copy {
		border: none;

		width: 3.5em;
		height: 3.5em;
	}

	.btn-code-copy:hover {
		cursor: pointer;
	}
`;
