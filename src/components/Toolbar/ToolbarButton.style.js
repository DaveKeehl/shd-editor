import styled from 'styled-components/macro'
import { transparentize } from 'polished'

import { utils } from '../../utils'

const colors = utils.colors

export const Button = styled.button`
	position: relative;

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	&:hover span {
		opacity: 1;
		visibility: visible;
	}

	span {
		opacity: 0;
		visibility: hidden;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: ${colors.white};
		white-space: nowrap;
		font-size: 14px;
		background: ${colors.headerBg};
		right: calc(100% + 18px);
		border-radius: 5px;
		padding: 8px;
		font-weight: bold;
		filter: drop-shadow(0 2px 4px ${transparentize('0.7', colors.black)});
		transition: opacity 0.2s;

		&::after {
			content: '';
			position: absolute;
			left: 100%;
			top: 50%;
			transform: translateY(-50%);
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 5px 0 5px 5px;
			border-color: transparent transparent transparent ${colors.black};
		}
	}

	button,
	label {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ${colors.headerBg};
		height: 35px;
		width: 35px;
		border-radius: 6px;
		color: ${colors.white};
		position: relative;
	}

	label {
		border: none;

		&:hover {
			cursor: pointer;
		}
		&:active {
			opacity: 0.8;
		}
		&:focus {
			outline: none;
		}

		input {
			display: none;
		}
	}
`
