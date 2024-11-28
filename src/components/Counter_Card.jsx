const Counter_Card = ({title, count}) => {
  return (
    <div className="min-w-[7rem] sm:min-w-[16rem] py-1 border-l-[6px] rounded-md border-sky-400 bg-white drop-shadow-[2px_2px_5px_rgba(173,216,230,0.6)] sm:drop-shadow-[3px_2px_14px_rgba(173,216,230,0.6)]">
        <div className="w-full flex flex-col gap-2 px-3 py-1">
            <p className="text-[13px] sm:text-sm font-medium text-[#4E5358]">{title}</p>
            <h4 className="text-2xl sm:text-5xl font-bold">{count}</h4>
        </div>
    </div>
  )
}
export default Counter_Card