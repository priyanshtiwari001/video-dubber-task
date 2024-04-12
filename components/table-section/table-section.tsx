"use client";
import cx from "clsx";
import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import { UserData } from "@/app/types/UserData";

import classes from "./table-section.module.css";

interface UserTypeProps {
  users: UserData[];
}

// const data = [
//   {
//     id: "1",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
//     name: "Robert Wolfkisser",
//     job: "Engineer",
//     email: "rob_wolf@gmail.com",
//   },
//   {
//     id: "2",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
//     name: "Jill Jailbreaker",
//     job: "Engineer",
//     email: "jj@breaker.com",
//   },
//   {
//     id: "3",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
//     name: "Henry Silkeater",
//     job: "Designer",
//     email: "henry@silkeater.io",
//   },
//   {
//     id: "4",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
//     name: "Bill Horsefighter",
//     job: "Designer",
//     email: "bhorsefighter@gmail.com",
//   },
//   {
//     id: "5",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
//     name: "Jeremy Footviewer",
//     job: "Manager",
//     email: "jeremy@foot.dev",
//   },
//   {
//     id: "6",
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
//     name: "Jeremy Footviewer",
//     job: "Manager",
//     email: "jeremy@foot.dev",
//   },
// ];

export function TableSelection({ users }: UserTypeProps) {
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === users.length ? [] : users.map((item) => item.id)
    );

  const rows = users.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={32} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.job}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={500} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(50) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === users.length}
                indeterminate={
                  selection.length > 0 && selection.length !== users.length
                }
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Job</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
