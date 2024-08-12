import { Box, FormControl, OutlinedInput, Typography } from "@mui/material";

interface LexinFormTextFieldProps {
    label : string
    controlValue : string
    controlOnChange : (s: string) => void
    placeholder?: string
}
export default function LexinFormTextField({label, controlValue, controlOnChange, placeholder} : LexinFormTextFieldProps) {
    
    const placeholderString = placeholder ?? "Enter text here"
    
    return (
        <Box>
            <FormControl variant="outlined" className="text-black my-2">
                <Typography className="mb-1"> {label} </Typography>
                <input
                    type="text"
                    placeholder={placeholderString}
                    value={controlValue}
                    onChange={e => controlOnChange(e.target.value)}
                    className={"radius-xl"}
                />
            </FormControl>
        </Box>
    )
}