import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useServicosStore = defineStore('servicos', {
  state: () => ({
    servicos: [],
    error: null,
  }),
  actions: {
    async getServicos() {
      this.error = null
      try {
        const { data } = await api.get('/servicos')
        this.servicos = data
        return this.servicos
      } catch (error) {
        this.error = error
      }
    },
    async postServico(
      nome,
      CPF,
      telefone,
      descricaoServico,
      itensRecebidos,
      dataEntrega,
      totalFinal,
      formaPagamento,
      statusPagamento,
      statusServico,
    ) {
      this.error = null
      try {
        const { data: servicoData } = await api.post('/servicos', {
          nome,
          CPF,
          telefone,
          descricaoServico,
          itensRecebidos,
          dataEntrega,
          totalFinal,
          formaPagamento,
          statusPagamento,
          statusServico,
        })
        this.servicos.push(servicoData)
        return servicoData
      } catch (error) {
        this.error = error
      }
    },
    async editServico(
      id,
      nome,
      CPF,
      telefone,
      descricaoServico,
      itensRecebidos,
      dataEntrega,
      totalFinal,
      formaPagamento,
      statusPagamento,
      statusServico,
    ) {
      this.error = null
      try {
        const { data: servicoData } = await api.patch(`/servicos/${id}`, {
          nome,
          CPF,
          telefone,
          descricaoServico,
          itensRecebidos,
          dataEntrega,
          totalFinal,
          formaPagamento,
          statusPagamento,
          statusServico,
        })
        const index = this.servicos.findIndex((servico) => servico.id === id)

        if (index !== -1) {
          this.servicos[index] = servicoData
        } else {
          this.servicos.push(servicoData)
        }
        return servicoData
      } catch (error) {
        this.error = error
      }
    },
    async deletarServico(id) {
      this.error = null
      try {
        await api.delete(`/servicos/${id}`)
        this.servicos = this.servicos.filter((servico) => servico.id !== id)
      } catch (error) {
        this.error = error
      }
    },
  },
})
