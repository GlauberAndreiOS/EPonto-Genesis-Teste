import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DatePicker } from '@/components/form-input/DatePicker'
import SelectInput from '@/components/form-input/SelectInput'
import TimePicker from '@/components/form-input/TimePicker'
import FormInput from '@/components/form-input/FormInput'
import { api } from '@/axios.config'

function PageBreadcrumb() {
	return (
		<Breadcrumb className='px-[34px]'>
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

// Tinha um quadrado branco com sombra no topo da página imaginei que fosse um alerta de sucesso ou erro
function PageMessage({ message, type }: { message: string, type?: 'erro' | 'sucesso' | '' }) {
	const bgColor = type === 'erro' ? 'bg-red-200' : type === 'sucesso' ? 'bg-green-200' : ''

	return (
		<div className={`h-[80px] mx-[34px] mt-[38px] mb-4 flex items-center ${bgColor} shadow-lg`}>
			<p className='text-[#1262B3] font-montserrat text-xl font-bold px-[34px] py-4'>{message}</p>
		</div>
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
				<button className='bg-[#1262B3] text-white rounded' onClick={() => handleGerarEscala({ dataInicial, dataFinal, horarioInicial, descricao, tipoEscala: tipoDeEscalaFinal })}>Gerar Escala</button>
			</div>
		</div>
	)
}

function handleGerarEscala({ dataInicial, dataFinal, horarioInicial, descricao, tipoEscala }:
	{
		dataInicial: Date | undefined,
		dataFinal: Date | undefined,
		horarioInicial: string,
		descricao: string,
		tipoEscala: string
	}) {
	api.post('https://localhost/lancamentos/escala/gerar-escala', {
		'description': descricao,
		'start_date': dataInicial,
		'final_date': dataFinal,
		'start_hour': horarioInicial,
		'rotation_type': tipoEscala
	})
	.then(response => {
		console.log(response)
	})
	.catch(error => {
		console.error(error)
	})
}


function PageDatatable({ data }: { data: [{}] }) {
	return (
		<div className='mx-[34px]'>

		</div>
	)
}


export default function Form() {

	return (
		<div>
			<PageMessage message='' type='' />
			<PageBreadcrumb />
			<PageTitle title='Cadastro de Escala' />
			<PageForm />
		</div>
	)
}