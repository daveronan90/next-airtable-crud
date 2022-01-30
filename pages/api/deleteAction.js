import { table, getMinifiedRecord } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { id } = req.body;
  const { user } = await getSession(req, res);

  try {
    const existingRecord = await table.find(id);

    if (!existingRecord || user.sub !== existingRecord.fields.userId) {
      return res.status(404).json({ msg: "Record not found" });
    }

    const deletedRecords = await table.destroy([id]);

    res.status(200).json(getMinifiedRecord(deletedRecords[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
