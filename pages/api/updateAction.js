import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { table, getMinifiedRecord } from "./utils/Airtable";

export default withApiAuthRequired(async function handler(req, res) {
  const { id, fields } = req.body;
  const { user } = await getSession(req, res);

  try {
    const existingRecord = await table.find(id);

    if (!existingRecord || user.sub !== existingRecord.fields.userId) {
      return res.status(404).json({ msg: "Record not found" });
    }

    const updatedRecords = await table.update([{ id, fields }]);

    res.status(200).json(getMinifiedRecord(updatedRecords[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
