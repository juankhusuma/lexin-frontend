export default function AIAnswer({ message } : { message: string }) {
    return (
        <div className="text-dark-navy-blue font-semibold mt-3 mb-6">
            {message}
        </div>
    )
}