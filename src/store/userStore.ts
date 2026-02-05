// stores/accountsStore.ts
import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { type Account, createEmptyAccount, prepareAccount } from '@/modules/form/service/formService'

const STORAGE_KEY = 'accounts-storage'

function loadAccounts(): Account[] {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) return []

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = reactive<Account[]>(loadAccounts())

  watch(accounts, (val) => saveAccounts(val), { deep: true })

  function addAccount() {
    accounts.push(createEmptyAccount())
  }

  function removeAccount(id: string | number) {
    const index = accounts.findIndex(a => a.id === id)

    if (index !== -1) accounts.splice(index, 1)
  }

  function updateAccount(updated: Account) {
    const index = accounts.findIndex(a => a.id === updated.id)

    if (index !== -1) accounts[index] = prepareAccount(updated)
  }

  return { accounts, addAccount, removeAccount, updateAccount }
})
