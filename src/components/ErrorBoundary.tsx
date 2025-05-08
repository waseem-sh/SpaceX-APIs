import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Alert, Title, Button, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred';
  let errorTitle = 'Oops!';

  if (isRouteErrorResponse(error)) {
    errorTitle = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Alert 
      icon={<IconAlertCircle size="1rem" />} 
      title={errorTitle}
      color="red"
      variant="outline"
      m="lg"
    >
      <Text mb="md">{errorMessage}</Text>
      <Button onClick={() => navigate('/')} variant="light">
        Return to Home
      </Button>
    </Alert>
  );
}