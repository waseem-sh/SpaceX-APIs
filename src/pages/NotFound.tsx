import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconHome, IconRocket } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container size="md" py={40}>
      <Group align="center" spacing="xl">
        <IconRocket size={100} strokeWidth={1} />
        <Title order={1}>404 - Page Not Found</Title>
        <Text size="lg" color="dimmed" align="center">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Group position="center">
          <Button
            leftIcon={<IconHome size={18} />}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Group>
      </Group>
    </Container>
  );
}