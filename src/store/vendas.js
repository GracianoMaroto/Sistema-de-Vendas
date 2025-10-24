import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useVendasStore = defineStore('vendas', {
  state: () => ({
    vendas: [],
    error: null,
  }),
  actions: {
    async getVendas() {
      this.error = null
      try {
        const { data } = await api.get('/vendas')
        console.log(data)
        this.vendas = data
        return this.vendas
      } catch (error) {
        this.error = error
      }
    },
    async postVenda(
      nome,
      CPF,
      telefone,
      descricaoVenda,
      dataEntrega,
      totalFinal,
      formaPagamento,
      statusPagamento,
      statusVenda,
    ) {
      this.error = null
      try {
        const { data: vendaData } = await api.post('/vendas', {
          nome,
          CPF,
          telefone,
          descricaoVenda,
          dataEntrega,
          totalFinal,
          formaPagamento,
          statusPagamento,
          statusVenda,
        })
        console.log(vendaData)
        this.vendas = { ...vendaData }
        return this.vendas
      } catch (error) {
        this.error = error
      }
    },
  },
})
