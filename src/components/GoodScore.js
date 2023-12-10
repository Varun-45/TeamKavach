import React from 'react'
import Breathing from './Breathing'
import ChatBox from './ChatBox'
import {
    ChakraProvider,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Heading,
    Spinner,
    Center,
    Divider,
} from '@chakra-ui/react';

const GoodScore = () => {
    const nearbyDoctors = [
        { name: 'Dr. Smith', specialization: 'Cardiologist', distance: '2 miles', contact: '+91 4587891234' },
        { name: 'Dr. Johnson', specialization: 'Dermatologist', distance: '1.5 miles', contact: '+91 8789123445' },
        { name: 'Dr. Williams', specialization: 'Orthopedic Surgeon', distance: '3 miles', contact: '+91 8912344587' },
        // Add more doctors as needed
    ];
    const nearbyVolunteers = [
        { name: 'John Doe', contact: '123-456-7890' },
        { name: 'Jane Doe', contact: '987-654-3210' },
        // Add more volunteers as needed
    ];

    const emergencyHelplineNumbers = [
        { type: 'Medical Emergency', number: '911' },
        { type: 'Police', number: '100' },
        { type: 'Fire', number: '101' },
        // Add more emergency numbers as needed
    ];

    return (
        <div>
            <Breathing />
            <Box p="4" bg="gray.100" borderRadius="md">
                <Box p="4" bg="white" borderRadius="md" boxShadow="md">
                    <Heading mb="4" color="teal.500">
                        Therapist data as per your location (kindly give us location access)
                    </Heading>
                    <Box>
                        <strong>Your Location:</strong> IIIT Sricity, Gyan Marg, Sricity ,517641
                    </Box>
                </Box>

                <Heading mb="4" mt="4" color="teal.500">
                    Nearby Doctors
                </Heading>
                <Center>Feel free to contact them</Center>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>Doctor Name</Th>
                            <Th>Distance</Th>
                            <Th>Contact number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {nearbyDoctors.map((doctor, index) => (
                            <Tr key={index}>
                                <Td>{doctor.name}</Td>
                                <Td>{doctor.distance}</Td>
                                <Td>{doctor.contact}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Divider my="4" />

                <Heading mb="4" color="teal.500">
                    Nearby Volunteers
                </Heading>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>Volunteer</Th>
                            <Th>Contact</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {nearbyVolunteers.map((volunteer, index) => (
                            <Tr key={index}>
                                <Td>{volunteer.name}</Td>
                                <Td>{volunteer.contact}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <Divider my="4" />

                <Heading mb="4" color="teal.500">
                    Emergency Helpline Numbers
                </Heading>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {emergencyHelplineNumbers.map((emergency, index) => (
                            <Tr key={index}>
                                <Td>{emergency.type}</Td>
                                <Td>{emergency.number}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </div>
    )
}

export default GoodScore