import { connectDb } from "@/helper/db";
import { Folder } from "@/models/folder";
import { NextResponse } from "next/server";
connectDb();

export const GET = async (req) => {
  const data = [
    {
      id: 101,
      name: "Folder 1",
      type: "folder",
      uuid: "1",
      children: [
        {
          name: "File 1",
          uuid: "2",
        },
        {
          name: "Folder 2",
          uuid: "3",

          id: 102,

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "4",
            },
          ],
        },
      ],
    },
    {
      name: "Folder 2",
      uuid: "5",

      id: 103,

      type: "folder",

      children: [
        {
          name: "File 1",
          uuid: "6",
        },
        {
          name: "File 2",
          uuid: "7",
        },
        {
          name: "Folder 2",
          uuid: "8",

          id: 104,

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "9",
            },
            {
              id: 110,
              name: "kirtikumar",
              type: "folder",
              uuid: "10",

              children: [
                {
                  name: "files 100",
                  uuid: "11",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Folder 3",
      id: 105,
      uuid: "12",

      type: "folder",

      children: [
        {
          name: "File 1",
          uuid: "13",
        },
        {
          name: "Folder 2",
          id: 106,
          uuid: "14",

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "15",
            },
          ],
        },
      ],
    },
  ];
  const folderData = await Folder.find();
  return NextResponse.json(folderData);
};
export const POST = async (req) => {
  try {
    const data = await req.json();
    
    const existingAllFolders = await Folder.find();

    if (existingAllFolders) {
      const updateDataByUUID = async (data, incomingData, parentUuid) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].uuid === parentUuid) {
            data[i].children.push({
              name: incomingData.name,
              type: incomingData.type,
              uuid: incomingData.uuid,
              children: [],
            });
            return data; // Return the updated data array
          } else if (data[i].children && data[i].children.length > 0) {
            const updatedChildren = await updateDataByUUID(data[i].children, incomingData, parentUuid);
            if (updatedChildren) {
              data[i].children = updatedChildren; // Update the children array
              return data;
            }
          }
        }
      };

      // Call the function to update the data array
      const updatedFolders = await updateDataByUUID(existingAllFolders, data, data.parentUuid);

      if (updatedFolders) {
        // Assuming Folder is your Mongoose model
        // Update the data in the database
        await Folder.deleteMany({}); // Clear existing data (Use caution with this line)
        await Folder.insertMany(updatedFolders); // Insert the updated data

        return NextResponse.json({ message: "Folder updated successfully" });
      }
    } else {
      // Your existing logic for creating a new folder
      // ...

      // Save the new folder back to the database
      // ...

      // Return appropriate response
      // ...
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error occurred" });
  }
};

