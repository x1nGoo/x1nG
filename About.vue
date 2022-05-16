<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleExport">导出6</button>
  </div>
</template>

<script>
import { utils, writeFileSync } from "xlsx";
import xlsxs from "xlsx-style";
import { saveAs } from "file-saver";

/*
vue.config.js
module.exports = {
  configureWebpack: {
    externals: {
      './cptable': 'var cptable'
    }
  }
}
*/

export default {
  methods: {
    handleExport() {
      const rows = [
        { name: "George Washington", birthday: "1732-02-22" },
        { name: "John Adams", birthday: "1735-10-19" },
        // ... one row per President
      ];
      const worksheet = utils.json_to_sheet(rows);
      for (let key in worksheet) {
        console.log('key', key);
        if (key.indexOf('!') !== 0) {
          // 给A1单元格设置样式
          if (key === 'A1') {
            console.log('worksheet', worksheet[key]);
            worksheet[key]['s'] = {
              font: {
                sz: 20,
                bold: true,
                color: {
                  rgb: 'FFFFFF'
                }
              },
              alignment: { 
                horizontal: 'center',
                vertical: 'center',
              },
              fill: {
                bgColor: {
                  rgb: '000000'
                }
              }
            }
          }
        }
      }

      // 遍历获取单元格的最大宽度
      const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
      // 设置每一列单元格的宽度
      worksheet["!cols"] = [ { wch: max_width }, { wch: max_width } ];

      // worksheet["!cols"] = [ { wch: 10 } ]; // set column A width to 10 characters

      // 合并单元格
      worksheet["!merges"] = [];
      worksheet["!merges"].push({
        s: {
          c: 0, // 开始列
          r: 2, // 开始行
        },
        e: {
          c: 1,
          r: 2
        }
      })

      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Dates");
      // writeFile(workbook, "Presidents.xlsx");

      // const buf = xlsxs.write(workbook, {type: "buffer", bookType: "xlsx"});
      /* buf is a Buffer */
      // writeFileSync("out.xlsx", buf);
      /* bookType can be any supported output type */
      var wopts = { bookType:"xlsx", bookSST:false, type:"buffer" };

      var wbout = xlsxs.write(workbook,wopts);

      /* the saveAs call downloads a file on the local machine */
      saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
    },
  }
}
</script>
