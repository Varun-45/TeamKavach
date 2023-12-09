import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Radio,
    RadioGroup,
    Select,
    Textarea,
    Button,
    Heading,
    Center,
    Image,
} from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import scoregif from "../images/score.gif"


const Form = () => {
    const [isOpen, setIsOpen] = useState(true);

    const onClose = () => setIsOpen(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [annualIncome, setAnnualIncome] = useState('');
    const [monthlyInvestments, setMonthlyInvestments] = useState('');
    const [numBankAccounts, setNumBankAccounts] = useState('');
    const [totalChildren, setTotalChildren] = useState('');
    const [gender, setGender] = useState('');
    const [educationType, setEducationType] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [housingStatus, setHousingStatus] = useState('');
    const [housingScore, setHscore] = useState(0);
    const [financeScore, setFscore] = useState(0);
    const [clk, setClk] = useState(false);

    const getScore = async (e) => {
        e.preventDefault();

        const res = await fetch('/predict_housing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CODE_GENDER: gender,
                CNT_CHILDREN: totalChildren,
                AMT_INCOME_TOTAL: annualIncome,
                NAME_EDUCATION_TYPE: educationType,
                NAME_FAMILY_STATUS: maritalStatus,
                NAME_HOUSING_TYPE: housingStatus,
            }),
        });

        const res2 = await fetch('/predict_finance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Age: age,
                Annual_Income: annualIncome,
                Monthly_Inhand_Salary: annualIncome / 12,
                Amount_invested_monthly: monthlyInvestments,
                Num_Bank_Accounts: numBankAccounts,
            }),
        });

        if (res.status === 200 && res2.status === 200) {
            const data = await res.json();
            const data2 = await res2.json();
            setHscore(parseInt(data * 10));
            setFscore(parseInt(data2));
            setClk(true);
        } else {
            window.alert('Please fill all the fields');
        }
    };
    return (
        <ChakraProvider>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Your Score
                        <Center> <Image src={scoregif}></Image></Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="xl" color={'black'}>Your score is 8.98/10.</Text>
                        <Text color={'black'}> We suggest you to take a look at the solutions we provide for your condition</Text>
                    </ModalBody>
                    <ModalFooter background={'white'}>
                        <Button colorScheme="green" onClick={onClose}>
                            <a href='/good'>  View Solutions</a>
                        </Button>
                        <Button colorScheme="blue" onClick={onClose} mx={4}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box p={4} maxW="700px" m="auto" borderRadius="0.25rem" bg={'#1c3953'} color={'white'}>
                Please fill out the form so we can help you in a  better way
                <form id="survey-form" method="POST">
                    <FormControl mb={4}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="age">Age</FormLabel>
                        <NumberInput id="age" precision={0} value={age} onChange={(value) => setAge(value)}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="annualIncome">Annual Income</FormLabel>
                        <Input
                            type="number"
                            id="annualIncome"
                            className="form-control"
                            placeholder="Annual Income"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="monthlyInvestments">Monthly Investments</FormLabel>
                        <Input
                            type="number"
                            id="monthlyInvestments"
                            className="form-control"
                            placeholder="Amount Invested monthly"
                            value={monthlyInvestments}
                            onChange={(e) => setMonthlyInvestments(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="numBankAccounts">Number of Bank Accounts</FormLabel>
                        <Input
                            type="number"
                            id="numBankAccounts"
                            className="form-control"
                            placeholder="Number of bank accounts"
                            value={numBankAccounts}
                            onChange={(e) => setNumBankAccounts(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="totalChildren">Total Children</FormLabel>
                        <Input
                            type="number"
                            id="totalChildren"
                            className="form-control"
                            placeholder="Total children"
                            value={totalChildren}
                            onChange={(e) => setTotalChildren(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup value={gender} onChange={(value) => setGender(value)}>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </RadioGroup>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="educationType">Education Type</FormLabel>
                        <Select id="educationType" value={educationType} onChange={(e) => setEducationType(e.target.value)}>
                            <option value={0} style={{ color: "black" }}>Secondary / secondary special</option>
                            <option value={1} style={{ color: "black" }}>Higher Education</option>
                            <option value={2} style={{ color: "black" }}>Incomplete Higher education</option>
                            <option value={3} style={{ color: "black" }}>Lower Secondary</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
                        <Select id="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                            <option value={0} style={{ color: "black" }}>Married</option>
                            <option value={1} style={{ color: "black" }}>Single</option>
                            <option value={2} style={{ color: "black" }}>Civil marriage</option>
                            <option value={3} style={{ color: "black" }}>Separated</option>
                            <option value={4} style={{ color: "black" }}>Widow</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel htmlFor="housingStatus">Housing Status</FormLabel>
                        <Select id="housingStatus" value={housingStatus} onChange={(e) => setHousingStatus(e.target.value)}>
                            <option style={{ color: "black" }} value={0}>House/apartments</option>
                            <option style={{ color: "black" }} value={1}>With parents</option>
                            <option style={{ color: "black" }} value={2}>Municipal apartments</option>
                            <option style={{ color: "black" }} value={3}>Rented Apartments</option>
                            <option style={{ color: "black" }} value={4}>Office Apartment</option>
                            <option style={{ color: "black" }} value={5}>Co-op Apartment</option>
                        </Select>
                    </FormControl>

                    <Button type="submit" colorScheme="teal" onClick={getScore} w="100%">
                        Submit
                    </Button>
                </form>
                {clk && (
                    <>
                        <Heading textAlign="center" mt="1.5rem">
                            Your total social score is
                        </Heading>
                        <Center fontSize="8rem" fontWeight="bold">
                            {(financeScore + housingScore) / 2}
                        </Center>
                    </>
                )}
            </Box>
        </ChakraProvider>
    );
};

export default Form;
