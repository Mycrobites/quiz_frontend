import { read, utils, writeFile } from "xlsx";

const getHeaderRowFromWorkbook = (workbook) => {
  try {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const headers = [];
    const range = utils.decode_range(sheet["!ref"]);
    let C;
    const R = range.s.r;
    for (C = range.s.c; C <= range.e.c; ++C) {
      const cell = sheet[utils.encode_cell({ c: C, r: R })];

      let hdr = `UNKNOWN ${C}`;
      if (cell && cell.t) hdr = utils.format_cell(cell);

      headers.push(hdr);
    }

    return headers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
};

const getArrayDataFromWorkbook = (workbook) => {
  try {
    return utils.sheet_to_row_object_array(
      workbook.Sheets[workbook.SheetNames[0]]
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDataFromArray = (array) => {
  const workbook = read(array, { type: "array", raw: true });
  const entries = getArrayDataFromWorkbook(workbook);
  const importFields = getHeaderRowFromWorkbook(workbook);

  return { workbook, entries, importFields };
};

export { getHeaderRowFromWorkbook, getArrayDataFromWorkbook, getDataFromArray };
