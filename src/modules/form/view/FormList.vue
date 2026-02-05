<script setup lang="ts">
import { QBtn, QIcon } from 'quasar'
import { useAccountsStore } from '@/store/userStore'
import FormCard from '@/modules/form/view/FormCard.vue'
import type { Account } from '@/modules/form/service/formService'

const store = useAccountsStore()

const addAccount = () => store.addAccount()
const updateAccount = (account: Account) => store.updateAccount(account)
const removeAccount = (id: string | number) => store.removeAccount(id)
</script>

<template>
  <div class="q-pa-md" style="max-width: 900px; margin: 0 auto; width: 100%;">
    
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Учетные записи</div>

      <QBtn
        label="Добавить"
        icon="add"
        color="primary"
        rounded
        unelevated
        @click="addAccount"
      />
    </div>

    <!-- Hint -->
    <div class="row items-center q-mb-md text-grey-7">
      <QIcon name="info" size="16px" class="q-mr-sm" />

      <span>
        Для указания нескольких меток одной пары логин/пароль используйте
        <strong>;</strong>
      </span>
    </div>

    <!-- Accounts -->
    <div class="column q-gutter-md">
      <FormCard
        v-for="account in store.accounts"
        :key="account.id"
        :account-id="account.id"
        @update="updateAccount"
        @remove="() => removeAccount(account.id)"
      />
    </div>

    <!-- Empty -->
    <div
      v-if="!store.accounts.length"
      class="column items-center q-mt-xl text-grey-5"
    >
      <QIcon name="add_box" size="48px" />

      <div class="text-subtitle1 q-mt-sm">
        Нет учетных записей. Нажмите "+ Добавить".
      </div>
    </div>

  </div>
</template>
