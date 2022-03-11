import { InputPrice } from '../../../InputPrice'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'

export const ExpenseForm = ({
  formData,
  onChange,
}) => {
  const { spendOnServicesPerMonth } = formData

  return (
    <RowLayout
      align="middle"
      icon="icon/cellphone-notebook.svg"
      title="Servicios">
      <InputLayout
        label="¿Cuánto gastas en servicios por mes?"
        tooltip
        tooltipText="Considera que el promedio de gastos en servicios a nivel nacional es de $ 180.750 CLP">
        <InputPrice
          placeholder="150.000 CLP"
          value={spendOnServicesPerMonth}
          onChange={value => onChange(value, 'spendOnServicesPerMonth')}
        />
      </InputLayout>
    </RowLayout>
  )
}
