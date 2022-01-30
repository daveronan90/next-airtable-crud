import { minifyRecords, table } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  try {
    const records = await table
      .select({
        filterByFormula: `userId = '${user.sub}'`,
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200).json(minifiedRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
