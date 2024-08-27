import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const api = axios.create({
	baseURL: import.meta.env.VITE_URL
})

const mock = new MockAdapter(api)

mock
	.onGet('/user/1').reply(200,
		{ id: 1, name: 'Glauber', age: 24 },
	)
	.onGet('/users').reply(200, {
		users: [{ id: 2, name: 'John Smith' }],
	})
	.onPost('/gerar-escala', {
		'start_date': '2024-01-01',
		'final_date': '2024-01-10',
		'start_hour': '18:00',
		'rotation_type': 1
	}).reply(200, [
		{
			"data": "2024-01-01",
			"entrada": "18:00",
			"saida": "06:00",
			"escala_folga": false,
			"entrada_1_previsto": "2024-01-01 18:00:00",
			"saida_1_previsto": "2024-01-02 06:00:00",
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-02",
			"escala_folga": true,
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-03",
			"entrada": "18:00",
			"saida": "06:00",
			"escala_folga": false,
			"entrada_1_previsto": "2024-01-03 18:00:00",
			"saida_1_previsto": "2024-01-04 06:00:00",
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-04",
			"escala_folga": true,
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-05",
			"entrada": "18:00",
			"saida": "06:00",
			"escala_folga": false,
			"entrada_1_previsto": "2024-01-05 18:00:00",
			"saida_1_previsto": "2024-01-06 06:00:00",
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-06",
			"escala_folga": true,
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-07",
			"entrada": "18:00",
			"saida": "06:00",
			"escala_folga": false,
			"entrada_1_previsto": "2024-01-07 18:00:00",
			"saida_1_previsto": "2024-01-08 06:00:00",
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-08",
			"escala_folga": true,
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-09",
			"entrada": "18:00",
			"saida": "06:00",
			"escala_folga": false,
			"entrada_1_previsto": "2024-01-09 18:00:00",
			"saida_1_previsto": "2024-01-10 06:00:00",
			"tipo_de_escala": "Escala 12/36"
		},
		{
			"data": "2024-01-10",
			"escala_folga": true,
			"tipo_de_escala": "Escala 12/36"
		}
	])