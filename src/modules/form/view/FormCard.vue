<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { QBtn, QIcon, QInput, QSelect, useQuasar } from 'quasar'
import type { Account } from '@/modules/form/service/formService'
import { prepareAccount } from '@/modules/form/service/formService'
import { useAccountsStore } from '@/store/userStore'

const props = defineProps<{ accountId: string }>()

const store = useAccountsStore()
const $q = useQuasar()

const account = computed(() =>
  store.accounts.find(a => a.id === props.accountId)
)

const isLocal = computed(() => account.value?.type?.value === 'LOCAL')

const shakeField = ref<string | null>(null)

const showPassword = ref(false)  

const typeOptions: Account[] = [
  { value: 'LDAP', label: 'LDAP' },
  { value: 'LOCAL', label: 'Локальная' }
]

function commit() {
  if (!account.value) return

  const prepared = prepareAccount(account.value)

  const firstError = Object.entries(prepared.errors).find(([, msg]) => msg)

  if (firstError) {
    const [field, msg] = firstError

    shakeField.value = field

    $q.notify({
      message: msg as string,
      color: 'negative',
      position: 'bottom',
      timeout: 2500
    })

    setTimeout(() => (shakeField.value = null), 400)
  }

  store.updateAccount(prepared)
}

watch(isLocal, (val) => {
  if (!val && account.value) {
    account.value.password = ''
    showPassword.value = false
  }
})
</script>


<template>
  <div
    v-if="account"
    class="account-card q-pa-md rounded-borders"
  >
    <div class="row q-col-gutter-md items-center">

      <div class="col-12 col-md">
        <QInput
          v-model="account.labelsRaw"
          @blur="commit"
          placeholder="Метки через ;"
          dense
          outlined
          :error="!!account.errors.labels"
          :class="{ shake: shakeField === 'labels' }"
        />
      </div>

      <div class="col-12 col-md-2">
        <QSelect
          v-model="account.type"
          :options="typeOptions"
          option-label="label"
          option-value="value"
          map-options
          label="Тип"
          dense
          outlined
          @update:model-value="commit"
        />
      </div>

      <div :class="isLocal
        ? 'col-12 col-md-2'
        : 'col-12 col-md-4'"
      >
        <QInput
          v-model="account.login"
          @blur="commit"
          placeholder="Логин"
          dense
          outlined
          :error="!!account.errors.login"
          :class="{ shake: shakeField === 'login' }"
        />
      </div>

      <div
        v-if="isLocal"
        class="col-12 col-md-2"
      >
        <QInput
          v-model="account.password"
          :type="showPassword ? 'text' : 'password'"
          @blur="commit"
          placeholder="Пароль"
          dense
          outlined
          :error="!!account.errors.password"
          :class="{ shake: shakeField === 'password' }"
        >
          <template #append>
            <QIcon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </QInput>
      </div>

      <div class="col-12 col-md-auto flex flex-center">
        <QBtn
          @click="account && store.removeAccount(account.id)"
          icon="delete"
          rounded
          unelevated
          dense
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.account-card {
  transition: background-color 0.3s;
}

@media (max-width: 767px) {
  .account-card {
    background-color: #f5f5f5; 
  }
}

@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}

.shake {
  animation: shake 0.5s;
}

.q-field--error {
  padding-bottom: 0 !important;
}
</style>

