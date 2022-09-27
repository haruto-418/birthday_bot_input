import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import moment from 'moment';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '../lib/type';
import { axiosInstance } from '../lib/axios';

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    const f = async () => {
      try {
        const res = await axiosInstance.get('/api/users');
        setUsers(res.data);
      } catch (err) {
        throw new Error(`error at index.tsx useEffect: ${err}`);
      }
    };
    f();
  }, [isOpen, isButtonLoading]);

  const doSubmit: SubmitHandler<any> = async (data: User): Promise<void> => {
    setIsButtonLoading(true);
    const res = await axiosInstance.post('/api/users', data);
    if (res.status === 200) {
      reset();
      setIsButtonLoading(false);
      onClose();
    } else {
      alert();
    }
  };

  const deleteUser = async (id: number) => {
    setIsButtonLoading(true);
    alert();
    const res = await axiosInstance.delete(`/api/users?id=${id}`);
    if (res.status === 200) {
      setIsButtonLoading(false);
    } else {
      alert();
    }
  };

  return (
    <Stack w={{ md: '80%', lg: '50%' }} mx={'auto'} py={20} spacing={4}>
      <HStack justify={'space-between'} px={4}>
        <HStack alignItems={'baseline'} spacing={4}>
          <Heading>Users</Heading>
          <Text fontSize={18}>{`(${users.length})`}</Text>
        </HStack>
        <Button
          px={8}
          bg={'cyan.200'}
          isLoading={isButtonLoading}
          onClick={onOpen}
        >
          ADD
        </Button>
      </HStack>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Birthday</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user: User) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.user_name}</Td>
                  <Td>{moment(user.birthday).format('YYYY-MM-DD')}</Td>
                  <Td>
                    <Button
                      bg={'red.200'}
                      isLoading={isButtonLoading}
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* User Name */}
              <FormControl>
                <FormLabel>user name</FormLabel>
                <Input
                  {...register('user_name', { required: '名前が未記入です。' })}
                />
                <Text color={'red'}>{errors.user_name?.message}</Text>
              </FormControl>
              {/* Birthday */}
              <FormControl>
                <FormLabel>Birthday</FormLabel>
                <Input
                  {...register('birthday', {
                    required: '誕生日が未記入です。',
                    pattern: {
                      value:
                        /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                      message: '誕生日の形式が違います。',
                    },
                  })}
                />
                <Text color={'red'}>{errors.birthday?.message}</Text>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              w={200}
              px={6}
              bg={'cyan.200'}
              fontWeight={'bold'}
              isLoading={isButtonLoading}
              onClick={() => handleSubmit(doSubmit)()}
            >
              submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Home;
