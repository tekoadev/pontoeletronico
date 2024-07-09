import { IClockIn, ICompany, IUser } from "@/server/interface";
import pdfMaker from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Done from "../assets/imgs/check_circle.svg";
import Cancel from "../assets/imgs/cancel_circle.svg";

export const PDFgeneratorToDownload = (
  days: string[],
  generateRow: (
    value: string
  ) => [
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    string
  ],
  user: IUser,
  company: ICompany,
  month: string,
  year: string,
  generateTotalHours: () => string
) => {
  pdfMaker.vfs = pdfFonts.pdfMake.vfs;

  const headerTitle = [
    {
      text: "Espelho de pontos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 20],
    },
  ];

  const tableData = transformObjectToPDFMaker(days, generateRow);

  const details = [
    {
      columns: [
        [
          {
            text: `Empresa: ${company.name} \nCNPJ: ${company.cnpj}`,
            margin: [20, 10, 0, 5],
            alignment: "left",
          },
          {
            text: `Funcionário: ${user.name} \nCPF: ${user.cpf}`,
            margin: [20, 10, 0, 15],
            alignment: "left",
          },
        ],
        [
          {
            text: `Período:\n${month} / 20${year}`,
            margin: [0, 10, 20, 5],
            alignment: "right",
          },
          {
            text: `Horas contabilizadas:  ${generateTotalHours()}`,
            margin: [0, 10, 20, 15],
            alignment: "right",
          },
        ],
      ],
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "Dia",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Entrada",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Saída",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Entrada",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Saída",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Total",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
          ],
          ...tableData,
        ],
      },
      layout: {
        hLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i: any, node: any) {
          return "black";
        },
        vLineColor: function (i: any, node: any) {
          return "black";
        },
        vLineStyle: function (i: any, node: any) {
          if (i === 0 || i === node.table.widths.length) {
            return null;
          }
          return { dash: { length: 4 } };
        },
      },
    },
  ];

  const footer = (currentPage: string, pageCount: string) => {
    return [
      {
        text: currentPage + "/" + pageCount,
        fontSize: 9,
        alignment: "right",
        margin: [0, 10, 20, 0],
      },
    ];
  };

  const docDefinitions: any = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [headerTitle],
    content: [details],
    footer: footer,
  };

  pdfMaker.createPdf(docDefinitions).download();
};

export const PDFGeneratorToDownloadOfTheDiaristType = (
  days: string[],
  generateRow: (
    value: string
  ) => [
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    string
  ],
  user: IUser,
  company: ICompany,
  month: string,
  year: string,
  generateTotalEmployeeDays: () => number
) => {
  pdfMaker.vfs = pdfFonts.pdfMake.vfs;

  const headerTitle = [
    {
      text: "Espelho de pontos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 20],
    },
  ];

  const tableData = transformObjectToPDFMakerOfDiaristType(days, generateRow);

  const details = [
    {
      columns: [
        [
          {
            text: `Empresa: ${company.name} \nCNPJ: ${company.cnpj}`,
            margin: [20, 10, 0, 5],
            alignment: "left",
          },
          {
            text: `Funcionário: ${user.name} \nCPF: ${user.cpf}`,
            margin: [20, 10, 0, 15],
            alignment: "left",
          },
        ],
        [
          {
            text: `Período:\n${month} / 20${year}`,
            margin: [0, 10, 20, 5],
            alignment: "right",
          },
          {
            text: `Diárias contabilizadas:  ${generateTotalEmployeeDays()}`,
            margin: [0, 10, 20, 15],
            alignment: "right",
          },
        ],
      ],
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*"],
        body: [
          [
            {
              text: "Dia",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
            {
              text: "Diarista",
              style: "tableHeader",
              alignment: "center",
              fontSize: 14,
            },
          ],
          ...tableData,
        ],
      },
      layout: {
        hLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i: any, node: any) {
          return "black";
        },
        vLineColor: function (i: any, node: any) {
          return "black";
        },
        vLineStyle: function (i: any, node: any) {
          if (i === 0 || i === node.table.widths.length) {
            return null;
          }
          return { dash: { length: 4 } };
        },
      },
    },
  ];

  const footer = (currentPage: string, pageCount: string) => {
    return [
      {
        text: currentPage + "/" + pageCount,
        fontSize: 9,
        alignment: "right",
        margin: [0, 10, 20, 0],
      },
    ];
  };

  const docDefinitions: any = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [headerTitle],
    content: [details],
    footer: footer,
  };

  pdfMaker.createPdf(docDefinitions).download();
};

const transformObjectToPDFMaker = (
  days: string[],
  generateRow: (
    value: string
  ) => [
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    string
  ]
) => {
  return days.map((ele, i) => {
    const objectTransformedToBeAcceptedByPDFMaker = [
      { text: ele, fontSize: 13, alignment: "center" },
      ...generateRow(ele).map((ele2: any, i: number) => {
        if (i < 4) {
          return ele2?.time?.split(" ")[1] === undefined
            ? { text: "", fontSize: 13, alignment: "center" }
            : {
                text: ele2?.time?.split(" ")[1],
                fontSize: 13,
                alignment: "center",
              };
        } else {
          return { text: ele2, fontSize: 13, alignment: "center" };
        }
      }),
    ];

    return objectTransformedToBeAcceptedByPDFMaker;
  });
};

const transformObjectToPDFMakerOfDiaristType = (
  days: string[],
  generateRow: (
    value: string
  ) => [
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    string
  ]
) => {
  return days.map((ele, i) => {
    const objectTransformedToBeAcceptedByPDFMaker = [
      { text: ele, fontSize: 13, alignment: "center" },
      ...generateRow(ele).map((ele2: any, i: number) => {
        if (i < 1) {
          return ele2?.time?.split(" ")[1] === undefined
            ? { text: "X", fontSize: 13, alignment: "center" }
            : {
                text: "V",
                fontSize: 13,
                alignment: "center",
              };
        } else {
          return;
        }
      }),
    ].filter((item) => item !== undefined);
    console.log(objectTransformedToBeAcceptedByPDFMaker);
    return objectTransformedToBeAcceptedByPDFMaker;
  });
};
