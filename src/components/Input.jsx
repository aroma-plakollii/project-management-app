const Input = ({error, label, textarea, ...props}) => {
    const classes = `w-full p-1 border-b-2 rounded-sm  ${error ? ' border-red-500' : ' border-stone-300'} bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600`
    
    return (
        <p className="flex flex-col gap-1 my-4">
            <label className={`text-sm font-bold uppercase ${error ? 'text-red-500' : 'text-stone-500'}`}>{label}</label>
            {textarea ? 
            (<textarea {...props} className={classes} />) 
            :
            (<input {...props} className={classes} />)}
        </p>
    )
}

export default Input;