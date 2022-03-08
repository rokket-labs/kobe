import { Col, InputNumber, Row } from 'antd'

import { StyledDivider } from '../../components/StyledDivider'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'

// eslint-disable-next-line max-lines-per-function
export const EnergyForm = ({
  formData,
  onChange,
}) => {
  const {
    peopleLive,
    homeBig,
    electricityConsume,
    liquefiedGasConsume,
    naturalGasConsume,
    waterConsume,
  } = formData

  return (
    <>
      <RowLayout icon="icon/house.svg" title="Hogar">
        <Row align="middle">
          <Col span={10}>
            <InputLayout label="¿Cuántos viven en tu hogar?">
              <InputNumber
                min={0}
                placeholder="2"
                size="large"
                style={{ width: '100%' }}
                value={peopleLive}
                onChange={value => onChange(value, 'peopleLive')}
              />
            </InputLayout>
          </Col>
          <Col span={14}>
            <Col span={22}>
              <InputLayout
                label="¿De qué tamaño es tu hogar? (en m2)"
                margin={false}>
                <InputNumber
                  min={0}
                  placeholder="200 kms"
                  size="large"
                  style={{ width: '100%' }}
                  value={homeBig}
                  onChange={value => onChange(value, 'homeBig')}
                />
              </InputLayout>
            </Col>
          </Col>
        </Row>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/electricity.svg"
        title="Electricidad">
        <InputLayout
          label="¿Cuánta electricidad consumes al mes en tu hogar?"
          tooltip
          tooltipText="Puedes revisar esta información en la boleta de tu proveedor. El promedio en Chile es de 200KWh.">
          <InputNumber
            min={0}
            placeholder="200 kw"
            size="large"
            style={{ width: '100%' }}
            value={electricityConsume}
            onChange={value => onChange(value, 'electricityConsume')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/gas.svg" title="Gas">
        <InputLayout
          label="¿Cuánto gas licuado consumes al mes?"
          tooltip
          tooltipText="Puedes calcular los kgs haciendo kg de balones/mes. Por ejemplo, si es un balón de 45kgs cada 3 meses, son
15 kgs al mes.">
          <InputNumber
            min={0}
            placeholder="15 kgs"
            size="large"
            style={{ width: '100%' }}
            value={liquefiedGasConsume}
            onChange={value => onChange(value, 'liquefiedGasConsume')}
          />
        </InputLayout>
        <InputLayout
          label="Si cuentas con gas natural, ¿Cuánto consumes al mes?"
          tooltip
          tooltipText="Puedes revisar esta información en la boleta de tu proveedor. Si no cuentas con este servicio pon 0.">
          <InputNumber
            min={0}
            placeholder="20 m3"
            size="large"
            style={{ width: '100%' }}
            value={naturalGasConsume}
            onChange={value => onChange(value, 'naturalGasConsume')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/water.svg" title="Agua">
        <InputLayout label="¿Cuánto es tu consumo de agua por mes?">
          <InputNumber
            min={0}
            placeholder="12 lts"
            size="large"
            style={{ width: '100%' }}
            value={waterConsume}
            onChange={value => onChange(value, 'waterConsume')}
          />
        </InputLayout>
      </RowLayout>
    </>
  )
}
