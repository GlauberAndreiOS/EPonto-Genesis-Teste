import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DatePicker } from '@/components/form-input/DatePicker'
import SelectInput from '@/components/form-input/SelectInput'
import TimePicker from '@/components/form-input/TimePicker'
import FormInput from '@/components/form-input/FormInput'
import Mensagem, { useMessage, MensagemProvider } from '@/components/global/message/Mensagem'
import { api } from '@/axios.config'
import { format } from 'date-fns'
import { DataTable } from '@/components/Datatable/DatatableWithInput'
import { ColumnDef } from '@tanstack/react-table'

function PageBreadcrumb() {
	return (
		<Breadcrumb className='px-[34px] py-4'>
			<BreadcrumbList>
				<BreadcrumbItem className='font-montserrat'>
					<BreadcrumbLink className='text-zinc-500 hover:text-[#1262B3] visited:text-zinc-500' href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem className='font-montserrat'>
					<BreadcrumbLink className='text-zinc-500 hover:text-[#1262B3] visited:text-zinc-500' href="/lancamento">Lancamento</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem className='font-montserrat'>
					<BreadcrumbLink className='text-zinc-500 hover:text-[#1262B3] visited:text-zinc-500' href="/lancamento/escala">Escala</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem className='font-montserrat'>
					<BreadcrumbPage>Cadastro</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

function PageTitle({ title }: { title: string }) {
	return (
		<h1 className='text-[#1262B3] font-montserrat text-2xl font-bold px-[34px] py-4'>{title}</h1>
	)
}

function PageForm() {
	const [dataInicial, setDataInicial] = useState<Date | undefined>(undefined)
	const [dataFinal, setDataFinal] = useState<Date | undefined>(undefined)
	const [horarioInicial, setHorarioInicial] = useState<string>('')
	const [descricao, setDescricao] = useState<string>('')

	enum TipoEscala { '4/2' = '4/2', '5/1' = '5/1', '5/2' = '5/2', '6/1' = '6/1', '12/36' = '12/36', '12/24' = '12/24', '12/48' = '12/48', '18/36' = '18/36', '24/48' = '24/48', 'Outro' = 'Outro' }
	const TiposDeEscalaArray = Object.values(TipoEscala).filter((v) => isNaN(Number(v)))
	const [tipoEscala, setTipoEscala] = useState<TipoEscala>(TipoEscala['4/2'])
	const [outroTipoEscala, setOutroTipoEscala] = useState<string>('')
	const tipoDeEscalaFinal = tipoEscala === TipoEscala['Outro'] ? outroTipoEscala : tipoEscala.toString()

	const tipoDeEscalaOutro = tipoEscala === 'Outro' ? 'block' : 'hidden block'

	const [datatable, setDatatable] = useState<Object>({})

	const datatableColumns: ColumnDef<any>[] = [
		{
			accessorKey: "data",
			header: "Dias"
		},
		{
			accessorKey: "entrada",
			header: "Entrada"
		},
		{
			accessorKey: "saida",
			header: "Saída"
		}
	]

	const { setMessage } = useMessage()

	function handleGerarEscala({ dataInicial, dataFinal, horarioInicial, tipoEscala }:
		{
			dataInicial: Date | undefined,
			dataFinal: Date | undefined,
			horarioInicial: string,
			tipoEscala: string
		}) {
		api.post('/gerar-escala', {
			'start_date': dataInicial ? format(dataInicial, "yyyy-MM-dd") : null,
			'final_date': dataFinal ? format(dataFinal, "yyyy-MM-dd") : null,
			'start_hour': horarioInicial,
			'rotation_type': tipoEscala
		})
			.then(response => {
				setDatatable(response.data.map((datatable: { data: Date, escala_folga: boolean, entrada: string, saida: string }) => {
					return {
						data: format(`${datatable.data} `, "dd/MM/yyyy"),
						entrada: datatable.escala_folga ? 'Folga' : datatable.entrada,
						saida: datatable.escala_folga ? 'Folga' : datatable.saida
					}
				}))
				setMessage({ text: "Escala gerada com sucesso!", type: "sucesso" })
			})
			.catch(err => {
				setMessage({ text: "Erro ao gerar escala! " + err.message, type: "erro" })
			})
	}

	return (
		<div>
			<div className='flex-row'>
				<div className='flex-row mx-[34px]'>
					<div className={`grid gap-2 ${tipoEscala === 'Outro' ? 'grid-cols-12' : 'grid-cols-8'}`}>
						<div className='col-span-4'>
							<FormInput label='Descrição' value={descricao} onChange={(value) => setDescricao(value)} />
						</div>
						<div className='col-span-4 flex'>
							<SelectInput label='Tipo de Escala' value={tipoEscala} onChange={(value) => setTipoEscala(TipoEscala[value as keyof typeof TipoEscala])} options={TiposDeEscalaArray} />
						</div>
						<div className={`col-span-4 ${tipoDeEscalaOutro}`}>
							<FormInput label='Outro' value={outroTipoEscala} onChange={(value) => setOutroTipoEscala(value)} />
						</div>
					</div>
				</div>
			</div>
			<div className='flex-row mx-[34px] py-4'>
				<div className='grid grid-cols-12 gap-2'>
					<div className='col-span-4'>
						<DatePicker label='Data Inicial' date={dataInicial} handleSetDate={(date) => setDataInicial(date)} />
					</div>
					<div className='col-span-4'>
						<DatePicker label='Data Final' date={dataFinal} handleSetDate={(date) => setDataFinal(date)} />
					</div>
					<div className='col-span-4'>
						<TimePicker value={horarioInicial} label='Horário Inicial' onChange={(value) => setHorarioInicial(value)} />
					</div>
				</div>
			</div>
			<div className='flex-row mx-[34px] py-4'>
				<button className='bg-[#1262B3] text-white rounded' onClick={() => handleGerarEscala({ dataInicial, dataFinal, horarioInicial, tipoEscala: tipoDeEscalaFinal })}>Gerar Escala</button>
			</div>
			<div className='flex-row mx-[34px] py-4'>
				<DataTable columns={datatableColumns} data={Object.values(datatable)} />
			</div>
		</div>
	)
}

export default function Form() {
	return (
		<div>
			<MensagemProvider>
				<Mensagem />
				<PageBreadcrumb />
				<PageTitle title='Cadastro de Escala' />
				<PageForm />
			</MensagemProvider>
		</div>
	)
}