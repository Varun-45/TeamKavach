import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    Text,
    Flex,
    Spacer,
    Image,
} from '@chakra-ui/react';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: newMessage, sender: 'You' },
            ]);
            setNewMessage('');
        }
    };

    return (
        <Box p="4" borderWidth="2px" borderRadius="lg" color={'black'}>
            <Text fontSize="xl" fontWeight="bold" mb="4" style={{ color: "bl" }}>
                SimpleChat
            </Text>
            <Box
                borderWidth="2px"
                borderRadius="lg"
                p="4"
                maxHeight="300px"
                overflowY="auto"
                mb="4"
                bgColor="#fcfcfe"
            >
                {messages.map((message, index) => (
                    <Flex
                        key={index}
                        direction={message.sender === 'You' ? 'row-reverse' : 'row'}
                    >
                        <Image
                            src={
                                message.sender === 'You'
                                    ? 'https://image.flaticon.com/icons/svg/145/145867.svg'
                                    : 'https://image.flaticon.com/icons/svg/327/327779.svg'
                            }
                            boxSize="50px"
                            borderRadius="full"
                            marginRight={message.sender === 'You' ? '0' : '10px'}
                        />
                        <Box
                            maxW="450px"
                            p="15px"
                            borderRadius="15px"
                            bg={message.sender === 'You' ? '#579ffb' : '#ececec'}
                            color={message.sender === 'You' ? '#fff' : '#000'}
                        >
                            <Flex justifyContent="space-between" alignItems="center" mb="2">
                                <Text fontWeight="bold">{message.sender}</Text>
                                <Text fontSize="0.85em">{formatDate(new Date())}</Text>
                            </Flex>
                            <Text>{message.text}</Text>
                        </Box>
                    </Flex>
                ))}
            </Box>
            <Flex>
                <Input
                    placeholder="Enter your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    mr="2"
                />
                <Button colorScheme="teal" onClick={handleSendMessage}>
                    Send
                </Button>
            </Flex>
        </Box>
    );
};

const formatDate = (date) => {
    const h = `0${date.getHours()}`.slice(-2);
    const m = `0${date.getMinutes()}`.slice(-2);

    return `${h}:${m}`;
};

export default ChatBox;
