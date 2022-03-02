import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import { Image, Typography } from 'antd'
import styled from 'styled-components'

const { Paragraph } = Typography

const StyledParagraph = styled(Paragraph)`
  color: ${({ color }) => color};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border-radius: 5px;
  line-height: 1.8rem;
  margin-top: 0.25rem;
  text-align: center;
  padding: 0.1rem 1rem;
  margin-bottom: 0 !important;
  cursor: default;
`

const StyledRight = styled.div`
  position: absolute;
  top: -7px;
  right: -5px;
`

const StyledCicle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ffffff;
  border: 0.063rem solid #38a169;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  animation: heart-pulse 2s infinite;

  @keyframes heart-pulse {
    50% {
      transform: scale(1);
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }
    80% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0);
    }
  }
`

const InfoText = ({
  backgroundColor = '#48BB78',
  color = '#FFF',
  isCopyable = true,
  isPlant = false,
  text,
  onClick,
}) => {
  return (
    <>
      {isPlant && (
        <StyledRight>
          <StyledCicle>
            <Image src="/icon/plant.svg" width={15.7} preview={false} />
          </StyledCicle>
        </StyledRight>
      )}
      <StyledParagraph
        backgroundcolor={backgroundColor}
        onClick={onClick || null}
        color={color}
        copyable={
          isCopyable
            ? {
                icon: [
                  <CopyOutlined key="copy-icon" style={{ color }} />,
                  <CheckOutlined key="copied-icon" style={{ color }} />,
                ],
                tooltips: false,
                text,
              }
            : false
        }
      >
        {text.length > 11 ? `${text.slice(0, 6)}...${text.substr(-3)}` : text}
      </StyledParagraph>
    </>
  )
}

export default InfoText
