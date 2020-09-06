import styled from 'styled-components/macro'

import { transparentize } from 'polished'
import { utils } from '../../utils'

const colors = utils.colors

export const StyledHeader = styled.header`
	position: relative;
	z-index: 10;
	background: ${colors.headerBg};
	color: ${colors.white};
	padding: 8px;
	box-shadow: 0 4px 10px ${transparentize('0.75', colors.headerBg)};
	height: fit-content;
`

export const StyledH1 = styled.h1`
	font-family: 'Poppins', sans-serif;
	font-size: 26px;
	text-align: center;
`

export const StyledButton = styled.button`
	display: flex;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 10px;
`
