import { InputPrice } from '../../../InputPrice'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'

export const PropertyForm = ({
  formData,
  onChange,
}) => {
  const { monthlySpendOnGoods } = formData

  return (
    <RowLayout align="middle" icon="icon/shopping-cart.svg" title="Bienes">
      <InputLayout
        label="¿Cuánto gastas aproximadamente en bienes por mes?"
        tooltip
        tooltipText="Considera que el promedio de gastos en bienes a nivel nacional es de $ 99.350 CLP">
        <InputPrice
          placeholder="100.000 CLP"
          value={monthlySpendOnGoods}
          onChange={value => onChange(value, 'monthlySpendOnGoods')}
        />
      </InputLayout>
    </RowLayout>
  )
}
