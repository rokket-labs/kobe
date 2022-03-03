import { Col, InputNumber, Radio, Row, Select, Typography } from 'antd'

import { StyledDivider } from '../../components/StyledDivider'
import { TextAsk } from '../../components/TextAsk'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'
import { SelectLayout } from '../../layouts/SelectLayout'

const { Option } = Select
const { Text } = Typography

const VehicleSection = () => {
  return (
    <RowLayout align="middle" icon="icon/car.svg" title="Automóvil">
      <Row>
        <Col span={12}>
          <Text>¿Tienes vehículo?</Text>
        </Col>
        <Col span={12}>
          <Radio.Group>
            <Radio value={1}>Sí</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row style={{ margin: '12px 0 ' }}>
        <Col span={12}>
          <SelectLayout label="Tipo de combustible">
            <Select
              placeholder="Selecciona tipo"
              style={{ width: '100%' }}
              size="large">
              <Option value="one">One</Option>
              <Option value="two">Two</Option>
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
      <Row>
        <Col span={24}>
          <InputLayout label="Consumo promedio de tu auto">
            <InputNumber
              min={0}
              placeholder="17 kms/litro"
              size="large"
              style={{ width: '100%' }}
            />
          </InputLayout>
        </Col>
      </Row>
    </RowLayout>
  )
}

const AirplaneSection = () => {
  return (
    <RowLayout icon="icon/airplane.svg" title="Avión">
      <TextAsk text="¿Cuántos viajes de 640 Kms o menos realizas por año?" />
      <InputLayout
        label="Viajes (considera la ida y vuelta por separado)"
        tooltip
        tooltipText="Por ejemplo, considera un vuelo hacia La Serena desde Santiago, ida y vuelta como dos viajes por separado."
        question={false}>
        <InputNumber
          min={0}
          placeholder="4"
          size="large"
          style={{ width: '100%' }}
        />
      </InputLayout>
      <TextAsk text="¿Cuántos viajes entre 640 Kms y 2.410 Kms realizas por año?" />
      <InputLayout
        label="Viajes (considera la ida y vuelta por separado)"
        tooltip
        tooltipText="Por ejemplo, considera un vuelo hacia Puerto Montt desde Santiago, ida y vualta como dos viajes por separado."
        question={false}>
        <InputNumber
          min={0}
          placeholder="80%"
          size="large"
          style={{ width: '100%' }}
        />
      </InputLayout>
      <TextAsk text="¿Cuántos viajes entre 2.410 Kms y 4.830 Kms realizas por año?" />
      <InputLayout
        label="Viajes (considera la ida y vuelta por separado)"
        tooltip
        tooltipText="Por ejemplo, considera un vuelo hacia Bogotá desde Santiago, ida y vualta como dos viajes por separado."
        question={false}>
        <InputNumber
          min={0}
          placeholder="80%"
          size="large"
          style={{ width: '100%' }}
        />
      </InputLayout>
      <TextAsk text="¿Cuántos viajes de más de 4.830 Kms realizas por año?" />
      <InputLayout
        label="Viajes (considera la ida y vuelta por separado)"
        tooltip
        tooltipText="Por ejemplo, considera un vuelo hacia Miami desde Santiago, ida y vualta como dos viajes por separado."
        question={false}>
        <InputNumber
          min={0}
          placeholder="80%"
          size="large"
          style={{ width: '100%' }}
        />
      </InputLayout>
    </RowLayout>
  )
}

export const TransportFormAdvanced = () => {
  return (
    <>
      <VehicleSection />
      <StyledDivider />
      <RowLayout align="middle" icon="icon/taxi.svg" title="Apps y taxi">
        <InputLayout
          label="Kilómetros recorridos por semana"
          tooltip
          tooltipText=""
          question={false}>
          <InputNumber
            min={0}
            placeholder="200 kms"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/bus.svg" title="Bus público">
        <InputLayout label="Kilómetros recorridos por semana">
          <InputNumber
            min={0}
            placeholder="120 kms"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/metro.svg"
        title="Metro - tren público">
        <InputLayout label="Kilómetros recorridos por semana">
          <InputNumber
            min={0}
            placeholder="120 kms"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <AirplaneSection />
    </>
  )
}
