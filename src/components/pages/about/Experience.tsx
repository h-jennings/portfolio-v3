import { Table, Td, Th, Thead, Tr } from '@/components/Table';

const ExperienceItem = (): JSX.Element => {
  return (
    <Tr>
      <Td>Front End Developer</Td>
      <Td>Elegant Seagulls</Td>
      <Td>2021 - Current</Td>
    </Tr>
  );
};

export const Experience = (): JSX.Element => {
  return (
    <section>
      <Table>
        <Thead>
          <Tr>
            <Th>role</Th>
            <Th>company</Th>
            <Th>time</Th>
          </Tr>
        </Thead>
        <tbody>
          <ExperienceItem />
          <ExperienceItem />
          <ExperienceItem />
        </tbody>
      </Table>
    </section>
  );
};
