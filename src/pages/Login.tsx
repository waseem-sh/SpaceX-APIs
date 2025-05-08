import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Center,
  Stack,
  Group,
  Space,
  Divider
} from '@mantine/core';
import { IconAt, IconLock, IconRocket } from '@tabler/icons-react';
import { useAuthStore } from '../store/app.store';

export function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/resources');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card
        shadow="lg"
        padding="xl"
        radius="md"
        withBorder
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Center mb="xl">
          <Group spacing="xs">
            <IconRocket size={32} color="#228be6" />
            <Title order={2}>SpaceX Dashboard</Title>
          </Group>
        </Center>

        <Divider
          label="Sign in to continue"
          labelPosition="center"
          mb="xl"
        />

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              icon={<IconAt size={16} />}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              size="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              icon={<IconLock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              size="md"
            />

            <Space h="sm" />

            <Button
              type="submit"
              fullWidth
              size="md"
              loading={loading}
            >
              Sign In
            </Button>
          </Stack>
        </form>

        <Text size="sm" color="dimmed" mt="xl" align="center">
          Demo credentials: user@example.com / password
        </Text>
      </Card>
    </Container>
  );
}