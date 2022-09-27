import React from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { User } from '../lib/type';

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const doSubmit: SubmitHandler<any> = async (data: User) => {};

  return (
    <Stack w={'70%'} mx={'auto'} py={20} spacing={4}>
      <Heading>Create User</Heading>
      {/* User Name */}
      <FormControl>
        <FormLabel>user name</FormLabel>
        <Input {...register('name', { required: '名前が未記入です。' })} />
        <Text color={'red'}>{errors.name?.message}</Text>
      </FormControl>
      {/* Birthday */}
      <FormControl>
        <FormLabel>Birthday</FormLabel>
        <Input
          {...register('birthday', { required: '誕生日が未記入です。' })}
        />
        <Text color={'red'}>{errors.birthday?.message}</Text>
      </FormControl>
      <Center>
        <Button
          w={200}
          p={6}
          bg={'teal.100'}
          fontWeight={'bold'}
          onClick={() => handleSubmit(doSubmit)()}
        >
          submit
        </Button>
      </Center>
    </Stack>
  );
};

export default Home;
