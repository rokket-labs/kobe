import { Col, InputNumber, Select } from 'antd'

import { StyledDivider } from '../../components/StyledDivider'
import { InputLayout } from '../../layouts/InputLayout'

const { Option } = Select

import { RowLayout } from '../../layouts/RowLayout'
import { SelectLayout } from '../../layouts/SelectLayout'

const FirstForm = () => {
  return (
    <>
      <RowLayout align="middle" icon="icon/diet.svg" title="Dieta">
        <Col span={24}>
          <SelectLayout label="¿Cuál es tu tipo de dieta?">
            <Select
              placeholder="Selecciona tu tipo de alimentación"
              style={{ width: '100%' }}
              size="large">
              <Option value="one">One</Option>
              <Option value="two">Two</Option>
            </Select>
          </SelectLayout>
        </Col>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/meat.svg" title="Carnes rojas">
        <InputLayout
          label="¿Cuántas veces consumes carne a la semana? (vacuno, cordero, cerdo)"
          tooltip
          tooltipText="El promedio es 5 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="2"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/chicken.svg" title="Carnes blancas">
        <InputLayout
          label="¿Cuántas veces comes a la semana? (pollo, pavo)"
          tooltip
          tooltipText="El promedio es 5 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="4"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/fish.svg"
        title="Pescados y mariscos">
        <InputLayout
          label="¿Cuántas veces consumes a la semana?"
          tooltip
          tooltipText="El promedio es 3 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="1"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/sausages.svg"
        title="Fiambres y procesados">
        <InputLayout
          label="¿Cuántas veces consumes a la semana?"
          tooltip
          tooltipText="El promedio es 5 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="1"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
    </>
  )
}

export const DietFormAdvanced = () => {
  return (
    <>
      <FirstForm />
      <StyledDivider />
      <RowLayout align="middle" icon="icon/eggs.svg" title="Huevos">
        <InputLayout
          label="¿Cuántas veces consumes a la semana?"
          tooltip
          tooltipText="El promedio es 5 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="30"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/bread.svg" title="Pan y harinas">
        <InputLayout
          label="¿Cuántas veces consumes por semana?"
          tooltip
          tooltipText="El promedio es 7 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="12"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/milk.svg" title="Lácteos">
        <InputLayout
          label="¿Cuántas veces consumes por semana?"
          tooltip
          tooltipText="El promedio es 8 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="12"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/vegetables.svg"
        title="Fruta y vegetales">
        <InputLayout
          label="¿Cuántas veces consumes por semana?"
          tooltip
          tooltipText="El promedio es 7 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="12"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/snacks.svg"
        title="Snacks, bebidas y otros">
        <InputLayout
          label="¿Cuántas veces consumes por semana?"
          tooltip
          tooltipText="El promedio es 12 veces a la semana.">
          <InputNumber
            min={0}
            placeholder="12"
            size="large"
            style={{ width: '100%' }}
          />
        </InputLayout>
      </RowLayout>
    </>
  )
}
