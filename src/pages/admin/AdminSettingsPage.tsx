import { useEffect, useState } from 'react'
import { Box, Heading, Stack, Text, useToast, Divider, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import SettingsForm from '../../components/SettingsForm'
import { getStoreSettings, updateStoreSettings, applyPrimaryColor } from '../../services/settingsService'
import { updateAdminPassword } from '../../services/authService'
import type { StoreSettings } from '../../types'

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState<Partial<StoreSettings>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      const data = await getStoreSettings()
      setSettings(data)
      setLoading(false)
    }
    void load()
  }, [])

  const handleSave = async (values: Partial<StoreSettings>) => {
    setSaving(true)
    const updated = await updateStoreSettings(values)
    setSaving(false)
    if (updated) {
      setSettings(updated)
      if (updated.primary_color) {
        applyPrimaryColor(updated.primary_color)
      }
      toast({ title: 'Configurações salvas.', status: 'success', duration: 3000, isClosable: true })
    } else {
      toast({ title: 'Erro ao salvar configurações.', status: 'error', duration: 4000, isClosable: true })
    }
  }

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast({ title: 'Preenchaa ambos os campos.', status: 'warning', duration: 3000, isClosable: true })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Senhas não coincidem.', status: 'error', duration: 3000, isClosable: true })
      return
    }
    if (newPassword.length < 4) {
      toast({ title: 'A senha deve ter pelo menos 4 caracteres.', status: 'warning', duration: 3000, isClosable: true })
      return
    }
    updateAdminPassword(newPassword)
    setNewPassword('')
    setConfirmPassword('')
    toast({ title: 'Senha alterada com sucesso.', status: 'success', duration: 3000, isClosable: true })
  }

  return (
    <Box>
      <Stack spacing={6}>
        <Heading size="lg">Configurações da loja</Heading>
        {loading ? (
          <Text>Carregando configurações...</Text>
        ) : (
          <>
            <SettingsForm initialData={settings} onSubmit={handleSave} isLoading={saving} />
            <Divider />
            <Box bg="white" p={6} rounded="2xl" border="1px solid" borderColor="gray.200" _dark={{ bg: 'surface.800', borderColor: 'whiteAlpha.100' }}>
              <Heading size="md" mb={4}>Segurança</Heading>
              <Stack spacing={4}>
                <Text fontSize="sm" color="gray.600" _dark={{ color: 'whiteAlpha.700' }}>
                  Altere a senha de acesso do painel admin.
                </Text>
                <FormControl>
                  <FormLabel>Nova senha</FormLabel>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite uma nova senha"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirmar senha</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                  />
                </FormControl>
                <Button colorScheme="brand" onClick={handleChangePassword} isDisabled={!newPassword || !confirmPassword}>
                  Alterar senha
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  )
}

export default AdminSettingsPage
