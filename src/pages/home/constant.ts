import type { UserInfo } from "./type";

export const MOCK_USERS: UserInfo[] = [
  {
    email: "alice.johnson@example.com",
    gender: "female",
    name: { first: "Alice", last: "Johnson" },
    nat: "US",
    picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/1.jpg" },
  },
  {
    email: "bob.smith@example.com",
    gender: "male",
    name: { first: "Bob", last: "Smith" },
    nat: "GB",
    picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg" },
  },
  {
    email: "clara.mueller@example.com",
    gender: "female",
    name: { first: "Clara", last: "Mueller" },
    nat: "DE",
    picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg" },
  },
  {
    email: "david.nguyen@example.com",
    gender: "male",
    name: { first: "David", last: "Nguyen" },
    nat: "FR",
    picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg" },
  },
];
