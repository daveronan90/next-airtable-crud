import { table } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { description } = req.body;
  const { user } = await getSession(req, res);
  console.log(user);
  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.status(200).json(createdRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
