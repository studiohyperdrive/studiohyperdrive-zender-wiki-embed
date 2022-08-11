import { css } from 'lit';

export const MyElementStyle = css`
	:host {
		display: block;
		max-width: 50rem;
		padding: 1rem;
		margin: 0 auto;
	}

	.wiki-config {
		margin-bottom: 2rem;
	}
	.wiki-input {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem 2rem;
	}

	@media only screen and (min-width: 600px) {
		.wiki-input {
			grid-template-columns: 1fr auto;
			grid-column-gap: 1rem;
		}
	}
	.container {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
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
	.thumbnail img {
		width: 100%;
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

		padding: 0.625rem;
		margin-bottom: 2rem;
		background: #eeeeee;
		border-radius: 0.3rem;
	}

	.search-input {
		display: block;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.3rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.invalid-input-feedback {
		color: #dc3545;
		margin-top: 0.25rem;
	}

	/* Bootsrap css */
	.btn {
		--bs-btn-padding-x: 0.75rem;
		--bs-btn-padding-y: 0.375rem;
		--bs-btn-font-size: 1rem;
		--bs-btn-font-weight: 400;
		--bs-btn-line-height: 1.5;
		--bs-btn-border-width: 1px;
		--bs-btn-border-radius: 0.3rem;
		--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
		--bs-btn-disabled-opacity: 0.65;
		--bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
		display: inline-block;
		padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
		font-family: var(--bs-btn-font-family);
		font-size: var(--bs-btn-font-size);
		font-weight: var(--bs-btn-font-weight);
		line-height: var(--bs-btn-line-height);
		color: var(--bs-btn-color);
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
		border-radius: var(--bs-btn-border-radius);
		background-color: var(--bs-btn-bg);
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}
	.btn:focus {
		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
		outline: 0;
		box-shadow: var(--bs-btn-focus-box-shadow);
	}

	.search-btn {
		--bs-btn-color: #fff;
		--bs-btn-bg: #212529;
		--bs-btn-border-color: #212529;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: #424649;
		--bs-btn-hover-border-color: #373b3e;
		--bs-btn-focus-shadow-rgb: 66, 70, 73;
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #4d5154;
		--bs-btn-active-border-color: #373b3e;
		--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		--bs-btn-disabled-color: #fff;
		--bs-btn-disabled-bg: #212529;
		--bs-btn-disabled-border-color: #212529;
	}

	.search-btn:hover {
		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
	}

	.btn-code-copy {
		--bs-btn-color: #212529;
		--bs-btn-border-color: #212529;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: #212529;
		--bs-btn-hover-border-color: #212529;
		--bs-btn-focus-shadow-rgb: 33, 37, 41;
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #212529;
		--bs-btn-active-border-color: #212529;
		--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		--bs-btn-disabled-color: #212529;
		--bs-btn-disabled-bg: transparent;
		--bs-btn-disabled-border-color: #212529;
		--bs-gradient: none;

		--bs-btn-padding-x: 0.5rem;
		--bs-btn-padding-y: 0.325rem;
		--bs-btn-font-size: 0.85rem;
		--bs-btn-line-height: 1;
	}

	.btn-code-copy:hover {
		cursor: pointer;

		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
	}
`;
