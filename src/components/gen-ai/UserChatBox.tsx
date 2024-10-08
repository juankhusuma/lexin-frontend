export default function UserChatBox({ message } : { message: string }) {
    return (
        <div className="bg-dark-navy-blue text-white py-2 pl-6 pr-3 rounded-r-2xl rounded-bl-3xl">
            {message}
        </div>
    )
}

