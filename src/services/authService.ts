const ADMIN_KEY = 'neni_motos_admin_auth'
const PASSWORD_KEY = 'neni_motos_admin_password'
const DEFAULT_PASSWORD = 'admin'

export const getStoredPassword = (): string => {
  const stored = localStorage.getItem(PASSWORD_KEY)
  return stored || DEFAULT_PASSWORD
}

export const updateAdminPassword = (newPassword: string): void => {
  localStorage.setItem(PASSWORD_KEY, newPassword)
}

export const loginAdmin = (password: string): boolean => {
  const correctPassword = getStoredPassword()
  if (password === correctPassword) {
    localStorage.setItem(ADMIN_KEY, 'true')
    return true
  }
  return false
}

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_KEY)
}

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === 'true'
}
