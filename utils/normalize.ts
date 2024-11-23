function normalizePhoneNumber(value: string | undefined) {
  if (!value) return ''
  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

function normalizeCNPJ(value: string | undefined) {
  if (!value) return ''
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d+?)/, '$1')
}

function normalizePhoneOrMobilePhone(value: string | undefined) {
  if (!value) return ''
  return value
    .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses ao redor dos dois primeiros dígitos e um espaço após
    .replace(/(\d{5})(\d)/, '$1$2') // Junta os próximos cinco dígitos
    .replace(/(\d{9})(\d+?)/, '$1') // Garante que não sejam adicionados mais de nove dígitos após o espaço
}

function normalizeOnlyNumbers(value: string) {
  return value.replace(/\D/g, '')
}

export {
  normalizePhoneNumber,
  normalizeCNPJ,
  normalizePhoneOrMobilePhone,
  normalizeOnlyNumbers,
}
