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
        this.vendas.push(vendaData)
        return vendaData
      } catch (error) {
        this.error = error
      }
    },
    async editVenda(
      id,
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
        const { data: vendaData } = await api.patch(`/vendas/${id}`, {
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
        const index = this.vendas.findIndex((venda) => venda.id === id)

        if (index !== -1) {
          this.vendas[index] = vendaData
        } else {
          this.vendas.push(vendaData)
        }
        return vendaData
      } catch (error) {
        this.error = error
      }
    },
    async deletarVenda(id) {
      this.error = null
      try {
        await api.delete(`/vendas/${id}`)
        this.vendas = this.vendas.filter((venda) => venda.id !== id)
      } catch (error) {
        this.error = error
      }
    },
  },
})
