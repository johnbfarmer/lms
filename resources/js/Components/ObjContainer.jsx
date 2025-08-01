export default function ObjContainer (props) {
	let f = props.data.map((d,k) => {
		return (
			<div className="cursor-pointer" key={ k } onDoubleClick={ () => props.xxx(d.id) }>{d.name}</div>
		)
	})
	return (
		<div className="min-w-[40%] border border-black rounded mx-2 shadow">
			<div className="border-b border-black bg-slate-100">
				{ props.title }
			</div>
			<div className="max-h-[300px] overflow-y-scroll">
				{ f }
			</div>
		</div>
	)
}