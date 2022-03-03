import { Image, Tooltip } from 'antd'

/**
  type TooltipInfoProps = {
    title: string
    question?: boolean
  }
*/

export const TooltipInfo = ({
  title,
  question = true,
}) => {
  const getIcon = () => {
    return question ? 'icon/question.svg' : 'icon/alert-info.svg'
  }

  const getSize = () => {
    return question ? 20 : 22
  }

  return (
    <Tooltip
      color="#FFFFFF"
      overlayInnerStyle={{
        color: 'black',
        border: '2px solid #38A169',
        borderRadius: '5px',
        fontSize: '12px',
      }}
      title={title}>
      <Image src={getIcon()} preview={false} height={getSize()} />
    </Tooltip>
  )
}
