import axios from "axios";

export async function POST(req: Request) {
    const { data } = await axios.get("https://www.kompas.com/robots.txt")
    return data
}   