/*
 * @Author       : Zhelin Cheng
 * @Date         : 2020-07-30 16:13:44
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2020-07-30 17:23:08
 * @FilePath     : /txt2mobi/src/core/slice.ts
 * @Description  : 未添加文件描述
 */

export interface SliceItem {
  title: string;
  content: string;
}

export function slice(str: string, regStr = `^(第.{1,7}|终)章|^楔子`): SliceItem[] {
  const arr: string[] = str.split(/\r\n|\r|\n/);
  const sliceArr: SliceItem[] = [];
  let sliceItem = {
    title: '',
    content: '',
  };

  const reg = new RegExp(regStr)

  arr.forEach((text: string) => {
    const len = text.length
    if (len <= 30 && reg.test(text)) {
      sliceItem.title && sliceArr.push(sliceItem);
      sliceItem = {
        title: text.trim(),
        content: '',
      };
    } else {
      sliceItem.content += `${text}\r\n`;
    }
  });
  sliceArr.push(sliceItem);

  return sliceArr;
}
