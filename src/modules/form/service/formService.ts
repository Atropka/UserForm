export type AccountType = {
  label: string
  value: string
}

export interface LabelItem {
  text: string
}

export interface AccountErrors {
  labels?: string
  login?: string
  password?: string
}

export interface Account {
  id: string
  labels: LabelItem[]
  labelsRaw: string
  type: AccountType
  login: string
  password?: string | null
  errors: Partial<AccountErrors>
}

const MAX_LABELS_LENGTH = 50
const MAX_LOGIN_LENGTH = 100
const MAX_PASSWORD_LENGTH = 100

function generateId() {
  return crypto.randomUUID()
}


export function createEmptyAccount(): Account {
  return {
    id: generateId(),
    labels: [],
    labelsRaw: '',
    type: { value: 'LOCAL', label: 'Локальная' },
    login: '',
    password: '',
    errors: {},
  }
}


export function parseLabels(raw: string): LabelItem[] {
  const seen = new Set<string>()

  return raw
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
    .filter((v) => !seen.has(v) && seen.add(v))
    .map((text) => ({ text }))
}


export function validateAccount(account: Account): boolean {
  const errors: AccountErrors = {}

  if (account.labelsRaw.trim().length > MAX_LABELS_LENGTH) {
    errors.labels = 'Максимум 50 символов'
  }

  const loginTrimmed = account.login.trim()

  if (!loginTrimmed || loginTrimmed.length > MAX_LOGIN_LENGTH) {
    errors.login = 'Логин обязателен, максимум 100 символов'
  }

  if (account.type.value === 'LOCAL') {
    const pwd = account.password?.trim() ?? ''

    if (!pwd || pwd.length > MAX_PASSWORD_LENGTH) {
      errors.password = 'Пароль обязателен, максимум 100 символов'
    }
  }

  account.errors = errors

  return Object.keys(errors).length === 0
}


export function prepareAccount(account: Account): Account {
  account.labels = parseLabels(account.labelsRaw)

  if (account.type.value === 'LDAP') {
    account.password = null
  } else {
    account.password ??= ''
  }

  validateAccount(account)

  return account
}
