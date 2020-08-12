import styled from 'styled-components/macro'

import { transparentize } from 'polished'
import { utils } from '../../utils'

const colors = utils.colors

export const StyledLogo = styled.img`
	filter: drop-shadow(0px 2px 4px ${transparentize('0.8', colors.black)});
	margin-bottom: 45px;
`

export const StyledToolbar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 8px;
	box-shadow: 0 0 30px ${transparentize('0.9', colors.black)};
	z-index: 1000;
`
