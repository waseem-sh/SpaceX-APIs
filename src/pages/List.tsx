import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  Loader,
  ScrollArea,
  TextInput,
  Group,
  Badge,
  Anchor,
  Select,
  Box,
  Text
} from '@mantine/core';
import { IconSearch, IconArrowsSort } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean | null;
  flight_number: number;
  upcoming: boolean;
  details: string | null;
}

export function ResourceList() {
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery<Launch[], Error>({
    queryKey: ['launches'],
    queryFn: () =>
      fetch('https://api.spacexdata.com/v4/launches')
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
  });

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof Launch | null>(null);
  const [reverse, setReverse] = useState(false);

  const processedData = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(launch =>
        launch.name.toLowerCase().includes(lowerSearch) ||
        (launch.details && launch.details.toLowerCase().includes(lowerSearch))
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];


        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue == null && bValue == null) return 0;

        if (sortBy === 'date_utc') {
          return reverse
            ? new Date(bValue as string).getTime() - new Date(aValue as string).getTime()
            : new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return reverse
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return reverse ? bValue - aValue : aValue - bValue;
        }

        return 0;
      });
    }

    return result;
  }, [data, search, sortBy, reverse]);

  if (isLoading) return <Loader size="xl" variant="dots" />;
  if (isError) return <Text color="red">Error: {error?.message}</Text>;

  return (
    <Box>
      <Group mb="md" position="apart">
        <TextInput
          placeholder="Search launches..."
          icon={<IconSearch size="0.9rem" />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ width: 300 }}
        />

        <Group>
          <Select
            placeholder="Sort by"
            data={[
              { value: 'name', label: 'Name' },
              { value: 'date_utc', label: 'Date' },
              { value: 'flight_number', label: 'Flight Number' },
            ]}
            value={sortBy}
            onChange={(value) => setSortBy(value as keyof Launch)}
            clearable
          />

          {sortBy && (
            <Badge
              variant="outline"
              onClick={() => setReverse(!reverse)}
              style={{ cursor: 'pointer' }}
              leftSection={<IconArrowsSort size="0.8rem" />}
            >
              {reverse ? 'Descending' : 'Ascending'}
            </Badge>
          )}
        </Group>
      </Group>

      <ScrollArea>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Flight #</th>
              <th>Mission</th>
              <th>Rocket ID</th>
              <th>Launch Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.flight_number}</td>
                <td>
                  <Anchor component={Link} to={`/resources/${launch.id}`}>
                    {launch.name}
                  </Anchor>
                </td>
                <td>
                  <Anchor component={Link} to={`/resources/${launch.id}`}>
                    {launch.rocket}
                  </Anchor>
                </td>
                <td>{new Date(launch.date_utc).toLocaleString()}</td>
                <td>
                  {launch.upcoming ? (
                    <Badge color="blue">Upcoming</Badge>
                  ) : launch.success ? (
                    <Badge color="green">Success</Badge>
                  ) : (
                    <Badge color="red">Failed</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}