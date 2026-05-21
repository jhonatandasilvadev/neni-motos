export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value)

export const formatKilometers = (value: number) =>
  `${new Intl.NumberFormat('pt-BR').format(value)} km`
