import { Col, InputNumber, Row, Select } from 'antd'

import { StyledDivider } from '../../components/StyledDivider'
import { TextAsk } from '../../components/TextAsk'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'
import { SelectLayout } from '../../layouts/SelectLayout'

const { Option } = Select

export const TransportForm = () => {
  return (
    <>
      <RowLayout align="middle" icon="icon/car.svg" title="Automóvil">
        <Row>
          <Col span={12}>
            <SelectLayout label="Tipo de combustible">
              <Select
                placeholder="Selecciona tipo"
                style={{ width: '100%' }}
                size="large">
                <Option value="1">Gasolina</Option>
                <Option value="2">Diésel</Option>
                <Option value="3">Eléctrico</Option>
              </Select>
            </SelectLayout>
          </Col>
          <Col span={12}>
            <Col span={22}>
              <InputLayout label="Kilómetros recorridos por mes" margin={false}>
                <InputNumber
                  min={0}
                  placeholder="1.000 kms"
                  size="large"
                  style={{ width: '100%' }}
                />
              </InputLayout>
            </Col>
          </Col>
        </Row>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/bus.svg" title="Transporte público">
        <InputLayout label="Kilómetros recorridos por mes">
          <InputNumber
            min={0}
            placeholder="100 kms"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        style={{ marginBottom: '20px' }}
        icon="icon/airplane.svg"
        title="Avión">
        <TextAsk
          text="¿Cuántos viajes cortos realizas por año?"
          advanced
          endText="(Menos de 4 hrs.)"
        />
        <InputLayout label="Viajes (considera la ida y vuelta por separado)">
          <Col span={12}>
            <InputNumber
              min={0}
              placeholder="4"
              size="large"
              style={{ width: '100%' }}
            />
          </Col>
        </InputLayout>

        <TextAsk
          text="¿Cuántos viajes largos realizas por año?"
          advanced
          endText="(Más de 4 hrs.)"
        />
        <InputLayout label="Viajes (considera la ida y vuelta por separado)">
          <Col span={12}>
            <InputNumber
              min={0}
              placeholder="10"
              size="large"
              style={{ width: '100%' }}
            />
          </Col>
        </InputLayout>
      </RowLayout>
    </>
  )
}
