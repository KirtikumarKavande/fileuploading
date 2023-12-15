import { NextResponse } from "next/server";

export const GET = (req) => {
  // data.js
  const data = [
    {
      id: 101,
      name: "Folder 1",
      type: "folder",
      children: [
        {
          name: "File 1",
        },
        {
          name: "Folder 2",
          id: 102,

          type: "folder",

          children: [
            {
              name: "File 2",
            },
          ],
        },
      ],
    },
    {
      name: "Folder 2",
      id: 103,

      type: "folder",

      children: [
        {
          name: "File 1",
        },
        {
          name: "Folder 2",
          id: 104,

          type: "folder",

          children: [
            {
              name: "File 2",
            },
          ],
        },
      ],
    },
    {
      name: "Folder 3",
      id: 105,

      type: "folder",

      children: [
        {
          name: "File 1",
        },
        {
          name: "Folder 2",
          id: 106,

          type: "folder",

          children: [
            {
              name: "File 2",
            },
          ],
        },
      ],
    },
  ];

  return NextResponse.json(data);
};
