import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';


const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
    
});

export default function LexinThemeProvider({children} : {children : React.ReactNode}) {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    )
}