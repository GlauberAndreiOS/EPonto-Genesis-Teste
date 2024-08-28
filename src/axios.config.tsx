import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { format, toDate } from 'date-fns';

enum TipoEscala {
	'4/2' = '4/2',
	'5/1' = '5/1',
	'5/2' = '5/2',
	'6/1' = '6/1',
	'12/36' = '12/36',
	'12/24' = '12/24',
	'12/48' = '12/48',
	'18/36' = '18/36',
	'24/48' = '24/48',
	'Outro' = 'Outro'
}

interface EscalaDia {
	data: string;
	entrada?: string;
	saida?: string;
	escala_folga: boolean;
	entrada_1_previsto?: string;
	saida_1_previsto?: string;
	tipo_de_escala: string;
}

function gerarEscalaTrabalho(
	tipoEscala: TipoEscala,
	dataInicial: Date,
	dataFinal: Date,
	horarioInicial: string
): EscalaDia[] {
	const escalaTrabalho: EscalaDia[] = [];
	let dataAtual = new Date(dataInicial);

	while (dataAtual <= dataFinal) {
		let diasTrabalho = 0;
		let diasFolga = 0;
		let duracaoTrabalhoHoras = 0;

		switch (tipoEscala) {
			case TipoEscala['4/2']:
				diasTrabalho = 4;
				diasFolga = 2;
				duracaoTrabalhoHoras = 8;
				break;
			case TipoEscala['5/1']:
				diasTrabalho = 5;
				diasFolga = 1;
				duracaoTrabalhoHoras = 8;
				break;
			case TipoEscala['5/2']:
				diasTrabalho = 5;
				diasFolga = 2;
				duracaoTrabalhoHoras = 8;
				break;
			case TipoEscala['6/1']:
				diasTrabalho = 6;
				diasFolga = 1;
				duracaoTrabalhoHoras = 8;
				break;
			case TipoEscala['12/36']:
				diasTrabalho = 1;
				diasFolga = 1.5; // Representa 36 horas
				duracaoTrabalhoHoras = 12;
				break;
			case TipoEscala['12/24']:
				diasTrabalho = 1;
				diasFolga = 1; // Representa 24 horas
				duracaoTrabalhoHoras = 12;
				break;
			case TipoEscala['12/48']:
				diasTrabalho = 1;
				diasFolga = 2; // Representa 48 horas
				duracaoTrabalhoHoras = 12;
				break;
			case TipoEscala['18/36']:
				diasTrabalho = 1;
				diasFolga = 1.5; // Representa 36 horas
				duracaoTrabalhoHoras = 18;
				break;
			case TipoEscala['24/48']:
				diasTrabalho = 1;
				diasFolga = 2; // Representa 48 horas
				duracaoTrabalhoHoras = 24;
				break;
			default:
				throw new Error('Tipo de escala não reconhecido');
		}

		for (let i = 0; i < diasTrabalho && dataAtual <= dataFinal; i++) {
			const entradaPrevisto = new Date(dataAtual);
			entradaPrevisto.setHours(parseInt(horarioInicial.split(':')[0]), parseInt(horarioInicial.split(':')[1]));

			const saidaPrevisto = new Date(entradaPrevisto);
			saidaPrevisto.setHours(saidaPrevisto.getHours() + duracaoTrabalhoHoras);

			escalaTrabalho.push({
				data: dataAtual.toISOString().split('T')[0],
				entrada: horarioInicial,
				saida: `${saidaPrevisto.getHours().toString().padStart(2, '0')}:${saidaPrevisto.getMinutes().toString().padStart(2, '0')}`,
				escala_folga: false,
				entrada_1_previsto: entradaPrevisto.toISOString().replace('T', ' ').split('.')[0],
				saida_1_previsto: saidaPrevisto.toISOString().replace('T', ' ').split('.')[0],
				tipo_de_escala: `Escala ${tipoEscala}`
			});

			dataAtual.setDate(dataAtual.getDate() + 1);
		}

		for (let i = 0; i < diasFolga && dataAtual <= dataFinal; i++) {
			escalaTrabalho.push({
				data: dataAtual.toISOString().split('T')[0],
				escala_folga: true,
				tipo_de_escala: `Escala ${tipoEscala}`
			});

			dataAtual.setDate(dataAtual.getDate() + 1);
		}
	}

	return escalaTrabalho;
}

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
	.onPost('/gerar-escala').reply(function (conf) {
		const dataInicial = toDate(format(`${JSON.parse(conf.data).start_date} `, "yyyy-MM-dd"))
		const dataFinal = toDate(format(`${JSON.parse(conf.data).final_date} `, "yyyy-MM-dd"))
		const horarioInicial = JSON.parse(conf.data).start_hour
		const tipoEscala = JSON.parse(conf.data).rotation_type 
		return [200, gerarEscalaTrabalho(tipoEscala, dataInicial, dataFinal, horarioInicial)]
	})