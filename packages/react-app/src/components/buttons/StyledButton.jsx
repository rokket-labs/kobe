import { Button } from 'antd'
import styled, { css } from 'styled-components'

const PrimaryButton = css`
  padding: 0 1.25rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  :hover,
  :active {
    background-color: ${props => props.theme.colors.primaryLight};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primaryLight};
  }

  :focus {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
  }
`
const GrayButton = css`
  padding: 0 1.25rem;
  background-color: ${props => props.theme.colors.gray};
  color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.gray};
  :hover,
  :active,
  :focus {
    background-color: ${props => props.theme.colors.gray};
    border-color: ${props => props.theme.colors.gray};
    color: ${props => props.theme.colors.primary};
  }
`

const DefaultButton = css`
  padding: 0 1.875rem;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.primary};
  :hover,
  :active {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primaryLight};
  }

  :focus {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`

const TealButton = css`
  padding: 0 1.875rem;
  background-color: ${props => props.theme.colors.teal};
  color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.teal};
  :hover,
  :active {
    background-color: ${props => props.theme.colors.tealLight};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.tealLight};
  }

  :focus {
    background-color: ${props => props.theme.colors.teal};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.teal};
  }
`

const TealDefaultButton = css`
  padding: 0 1.875rem;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.teal};
  border-color: ${props => props.theme.colors.teal};
  :hover,
  :active {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.tealLight};
    border-color: ${props => props.theme.colors.tealLight};
  }

  :focus {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.teal};
    border-color: ${props => props.theme.colors.teal};
  }
`

export const StyledButton = styled(Button)`
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 0 1.875rem;
  ${props => {
    switch (props.$type) {
      case 'teal':
        return TealButton
      case 'teal-default':
        return TealDefaultButton
      case 'primary':
        return PrimaryButton
      case 'gray':
        return GrayButton
      default:
        return DefaultButton
    }
  }}
`
