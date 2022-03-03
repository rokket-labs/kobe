import { Divider } from 'antd'
import styled from 'styled-components'

export const StyledDivider = styled(Divider)`
  border-top: 1px solid ${props => props.theme.colors.primary};
`
