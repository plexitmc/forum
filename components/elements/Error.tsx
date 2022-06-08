import { Box, Center, Text } from '@mantine/core';

const Error = ({ title, error}: { title: string, error: string }) => {
    return (
        <Box 
            sx={{
                backgroundColor: "rgba(240, 62, 62, 0.3)"
            }}>
            <Center style={{height: '100vh'}} sx={{ flexDirection: 'column' }}>
                {title && <Text color='red' weight='bold'>{title}</Text>}
                {error && <Text color='red'>{error}</Text>}
            </Center>
        </Box>
    )
}

Error.defaultProps = {
    title: "Oh snap!",
    error: "Something went wrong."
}


export default Error;