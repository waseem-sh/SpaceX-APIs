import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card, Title, Text, Image, Loader, Alert,
  Group, Stack, Badge, Divider, Anchor
} from '@mantine/core';
import { IconAlertCircle, IconExternalLink } from '@tabler/icons-react';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details?: string;
  success?: boolean;
  links: {
    patch: {
      small?: string;
    };
    flickr: {
      original: string[];
    };
    webcast?: string;
    article?: string;
  };
  rocket: string;
}

interface Rocket {
  name: string;
  type: string;
  company: string;
}

export function ResourceDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: launch, isLoading, error } = useQuery<Launch>({
    queryKey: ['launch', id],
    queryFn: () =>
      fetch(`https://api.spacexdata.com/v4/launches/${id}`)
        .then(res => res.json())
  });

  const { data: rocket } = useQuery<Rocket>({
    queryKey: ['rocket', launch?.rocket],
    queryFn: () =>
      fetch(`https://api.spacexdata.com/v4/rockets/${launch?.rocket}`)
        .then(res => res.json()),
    enabled: !!launch?.rocket
  });

  if (isLoading) return <Loader size="xl" variant="dots" />;
  if (error) return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
      Failed to load launch details
    </Alert>
  );

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" mb="md">
        <Title order={2}>{launch?.name}</Title>
        {launch?.success !== undefined && (
          <Badge color={launch.success ? 'teal' : 'red'} size="lg">
            {launch.success ? 'Successful' : 'Failed'}
          </Badge>
        )}
      </Group>

      <Stack spacing="md">
        {launch?.links.patch.small && (
          <Image
            src={launch.links.patch.small}
            width={200}
            height={200}
            alt="Mission patch"
            fit="contain"
            mx="auto"
          />
        )}

        <Text size="lg">
          <strong>Launch Date:</strong> {launch?.date_utc ? new Date(launch.date_utc).toLocaleString() : 'N/A'}
        </Text>

        {rocket && (
          <Text size="lg">
            <strong>Rocket:</strong> {rocket.name} ({rocket.type} by {rocket.company})
          </Text>
        )}

        {launch?.details && (
          <Text mt="sm">{launch.details}</Text>
        )}

        <Divider my="md" />

        <Title order={4}>Media</Title>
        <Group>
          {launch?.links.webcast && (
            <Anchor href={launch.links.webcast} target="_blank">
              <Badge rightSection={<IconExternalLink size="0.8rem" />}>
                Watch Webcast
              </Badge>
            </Anchor>
          )}
          {launch?.links.article && (
            <Anchor href={launch.links.article} target="_blank">
              <Badge rightSection={<IconExternalLink size="0.8rem" />}>
                Read Article
              </Badge>
            </Anchor>
          )}
          {launch?.links.flickr.original[0] && (
            <Anchor href={launch.links.flickr.original[0]} target="_blank">
              <Badge rightSection={<IconExternalLink size="0.8rem" />}>
                View Photos
              </Badge>
            </Anchor>
          )}
        </Group>
      </Stack>
    </Card>
  );
}