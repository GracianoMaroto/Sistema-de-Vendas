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
        console.log(data)
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
        console.log(servicoData)
        this.servicos = { ...servicoData }
        return this.servicos
      } catch (error) {
        this.error = error
      }
    },
  },
})
