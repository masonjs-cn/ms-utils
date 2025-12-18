# API 文档

本文档提供 `@masonjs/utils` 所有可用函数的详细说明。

## 目录

- [验证器（Validator）](#验证器validator)
- [工具函数（Utils）](#工具函数utils)
- [常量（Constants）](#常量constants)

## 验证器（Validator）

### 类型判断

#### isArray

判断是否为数组。

```typescript
isArray(value: any): boolean
```

**示例:**

```typescript
import { isArray } from '@masonjs/utils';

isArray([1, 2, 3]); // true
isArray('array'); // false
```

#### isObject

判断是否为对象。

```typescript
isObject(value: any): boolean
```

#### isString

判断是否为字符串。

```typescript
isString(value: any): boolean
```

#### isNumber

判断是否为数字。

```typescript
isNumber(value: any): boolean
```

#### isBoolean

判断是否为布尔值。

```typescript
isBoolean(value: any): boolean
```

#### isFunc

判断是否为函数。

```typescript
isFunc(value: any): boolean
```

#### isDate

判断是否为日期对象。

```typescript
isDate(value: any): boolean
```

#### isNull

判断是否为 null。

```typescript
isNull(value: any): boolean
```

#### isUndefined

判断是否为 undefined。

```typescript
isUndefined(value: any): boolean
```

#### isNaN

判断是否为 NaN。

```typescript
isNaN(value: any): boolean
```

### 格式验证

#### isEmail

验证是否为有效的邮箱地址。

```typescript
isEmail(value: string): boolean
```

**示例:**

```typescript
import { isEmail } from '@masonjs/utils';

isEmail('test@example.com'); // true
isEmail('invalid-email'); // false
```

#### isPhone

验证是否为有效的手机号码（中国大陆）。

```typescript
isPhone(value: string): boolean
```

#### isMobile

判断是否为移动设备。

```typescript
isMobile(): boolean
```

#### isUrl

验证是否为有效的 URL。

```typescript
isUrl(value: string): boolean
```

#### isIp

验证是否为有效的 IP 地址。

```typescript
isIp(value: string): boolean
```

#### isIdCard

验证是否为有效的身份证号码（中国大陆）。

```typescript
isIdCard(value: string): boolean
```

#### isPostalCode

验证是否为有效的邮政编码。

```typescript
isPostalCode(value: string): boolean
```

#### isPort

验证是否为有效的端口号（0-65535）。

```typescript
isPort(value: string | number): boolean
```

#### isColor

验证是否为有效的颜色值（16进制、rgb、rgba）。

```typescript
isColor(value: string): boolean
```

**示例:**

```typescript
import { isColor } from '@masonjs/utils';

isColor('#ff0000'); // true
isColor('rgb(255, 0, 0)'); // true
isColor('rgba(255, 0, 0, 0.5)'); // true
isColor('invalid'); // false
```

### 空值判断

#### isEmpty

判断值是否为空（null、undefined、空字符串、空数组、空对象）。

```typescript
isEmpty(value: any): boolean
```

#### isEmptyArray

判断是否为空数组。

```typescript
isEmptyArray(value: any): boolean
```

#### isEmptyObject

判断是否为空对象。

```typescript
isEmptyObject(value: any): boolean
```

#### isEmptyString

判断是否为空字符串。

```typescript
isEmptyString(value: any): boolean
```

### 特殊验证

#### isJSON

判断字符串是否为有效的 JSON。

```typescript
isJSON(value: string): boolean
```

#### isBlob

判断是否为 Blob 对象。

```typescript
isBlob(value: any): boolean
```

#### isAppleDevice

判断是否为苹果设备。

```typescript
isAppleDevice(): boolean
```

#### hasClass

判断 DOM 元素是否包含指定的 CSS 类名。

```typescript
hasClass(element: HTMLElement, className: string): boolean
```

### 字符串规则验证

#### isLetterNumber

验证字符串是否只包含字母和数字。

```typescript
isLetterNumber(value: string): boolean
```

#### isLetterNumberUnderline

验证字符串是否只包含字母、数字和下划线。

```typescript
isLetterNumberUnderline(value: string): boolean
```

#### isLetterNumberZhUnderline

验证字符串是否只包含字母、数字、汉字和下划线。

```typescript
isLetterNumberZhUnderline(value: string): boolean
```

## 工具函数（Utils）

### 数组操作

#### arrayEqual

判断两个数组是否相等。

```typescript
arrayEqual(arr1: any[], arr2: any[]): boolean
```

#### arrayUnique

数组去重。

```typescript
arrayUnique<T>(arr: T[]): T[]
```

**示例:**

```typescript
import { arrayUnique } from '@masonjs/utils';

arrayUnique([1, 2, 2, 3]); // [1, 2, 3]
```

#### intersection

获取两个数组的交集。

```typescript
intersection<T>(arr1: T[], arr2: T[]): T[]
```

### 对象操作

#### deepClone

深拷贝对象或数组。

```typescript
deepClone<T>(obj: T): T
```

**示例:**

```typescript
import { deepClone } from '@masonjs/utils';

const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj);
```

#### isEqual

判断两个值是否相等（深度比较）。

```typescript
isEqual(value1: any, value2: any): boolean
```

#### isEqualObject

判断两个对象是否相等。

```typescript
isEqualObject(obj1: any, obj2: any): boolean
```

#### isEqualArray

判断两个数组是否相等。

```typescript
isEqualArray(arr1: any[], arr2: any[]): boolean
```

#### getKeyList

获取对象的所有键（支持嵌套）。

```typescript
getKeyList(obj: any, prefix?: string): string[]
```

#### filterNull

过滤对象中的 null 和 undefined 值。

```typescript
filterNull<T extends Record<string, any>>(obj: T): Partial<T>
```

### 字符串处理

#### subBefore

获取字符串中指定字符之前的部分。

```typescript
subBefore(str: string, delimiter: string): string
```

#### subAfter

获取字符串中指定字符之后的部分。

```typescript
subAfter(str: string, delimiter: string): string
```

#### getValueType

获取值的类型字符串。

```typescript
getValueType(value: any): string
```

### 数学计算

#### sum

计算多个数字的和。

```typescript
sum(...args: number[]): number
```

**示例:**

```typescript
import { sum } from '@masonjs/utils';

sum(1, 2, 3, 4); // 10
```

#### strip

修复浮点数精度问题。

```typescript
strip(num: number, precision?: number): number
```

#### plus

精确加法。

```typescript
plus(...args: number[]): number
```

#### minus

精确减法。

```typescript
minus(...args: number[]): number
```

#### times

精确乘法。

```typescript
times(...args: number[]): number
```

#### divide

精确除法。

```typescript
divide(...args: number[]): number
```

#### round

精确四舍五入。

```typescript
round(num: number, ratio?: number): number
```

#### digitLength

获取数字的小数位数。

```typescript
digitLength(num: number): number
```

#### float2Fixed

将浮点数转换为整数。

```typescript
float2Fixed(num: number): number
```

### 格式化

#### formatBytes

格式化字节数为可读格式。

```typescript
formatBytes(bytes: number, decimals?: number): string
```

**示例:**

```typescript
import { formatBytes } from '@masonjs/utils';

formatBytes(1024); // '1 KB'
formatBytes(1048576); // '1 MB'
```

#### formatCommafy

格式化数字，添加千分位分隔符。

```typescript
formatCommafy(num: number | string): string
```

**示例:**

```typescript
import { formatCommafy } from '@masonjs/utils';

formatCommafy(1234567); // '1,234,567'
```

#### formatFloat

格式化浮点数，保留指定位数小数。

```typescript
formatFloat(num: number | string, decimals?: number): string
```

### 函数增强

#### debounce

防抖函数。

```typescript
debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void
```

**示例:**

```typescript
import { debounce } from '@masonjs/utils';

const handleSearch = debounce((keyword: string) => {
  console.log('Search:', keyword);
}, 300);

handleSearch('test'); // 300ms 后执行
```

#### throttle

节流函数。

```typescript
throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
```

### 日期处理

#### isLeapYear

判断是否为闰年。

```typescript
isLeapYear(year: number): boolean
```

#### remainTime

计算剩余时间。

```typescript
remainTime(endTime: string | number | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

#### isSameDay

判断两个日期是否为同一天。

```typescript
isSameDay(date1: Date | string | number, date2: Date | string | number): boolean
```

### DOM 操作

#### toggleClass

切换 DOM 元素的 CSS 类名。

```typescript
toggleClass(element: HTMLElement, className: string): void
```

#### isIncludeAllChildren

判断父元素是否包含所有子元素。

```typescript
isIncludeAllChildren(parent: HTMLElement, children: HTMLElement[]): boolean
```

#### openLink

在新窗口打开链接。

```typescript
openLink(url: string, target?: string): void
```

### 存储

#### getCookie

获取 Cookie 值。

```typescript
getCookie(name: string): string | null
```

#### setCookie

设置 Cookie。

```typescript
setCookie(name: string, value: string, days?: number): void
```

#### removeCookie

删除 Cookie。

```typescript
removeCookie(name: string): void
```

### 设备检测

#### getBrowserInfo

获取浏览器信息。

```typescript
getBrowserInfo(): {
  browser: string;
  version: string;
  os: string;
}
```

### 文件操作

#### downFile

下载文件。

```typescript
downFile(url: string, filename?: string): void
```

#### downloadImgStream

下载图片流。

```typescript
downloadImgStream(stream: Blob | string, filename?: string): void
```

#### convertImgStreamToBase64

将图片流转换为 Base64。

```typescript
convertImgStreamToBase64(stream: Blob | string): Promise<string>
```

### URL 处理

#### getQueryMap

解析 URL 查询参数为对象。

```typescript
getQueryMap(url?: string): Record<string, string>
```

#### isValidURL

验证 URL 是否有效。

```typescript
isValidURL(url: string): boolean
```

#### parseQueryString

解析查询字符串为对象。

```typescript
parseQueryString(query: string): Record<string, string>
```

#### stringfyQueryString

将对象转换为查询字符串。

```typescript
stringfyQueryString(obj: Record<string, any>): string
```

### 随机生成

#### randomColor

生成随机颜色。

```typescript
randomColor(): string
```

#### randomNum

生成随机数字。

```typescript
randomNum(min: number, max: number): number
```

#### randomPhone

生成随机手机号。

```typescript
randomPhone(): string
```

#### randomName

生成随机姓名。

```typescript
randomName(): string
```

### 工具

#### uuid

生成 UUID。

```typescript
uuid(): string
```

#### sleep

延时函数。

```typescript
sleep(ms: number): Promise<void>
```

**示例:**

```typescript
import { sleep } from '@masonjs/utils';

await sleep(1000); // 等待 1 秒
```

## 常量（Constants）

### 正则表达式

所有正则表达式常量都在 `constant/regexp.ts` 中定义，包括：

- `REGEXP_EMAIL` - 邮箱正则
- `REGEXP_PHONE` - 手机号正则
- `REGEXP_URL` - URL 正则
- `REGEXP_IP` - IP 地址正则
- 等等...

**使用示例:**

```typescript
import { REGEXP_EMAIL } from '@masonjs/utils';

REGEXP_EMAIL.test('test@example.com'); // true
```

### 类型枚举

#### ValueType

值类型枚举。

```typescript
enum ValueType {
  NULL = '[object Null]',
  UNDEFINED = '[object Undefined]',
  FUNCTION = '[object Function]',
  STRING = '[object String]',
  NUMBER = '[object Number]',
  // ...
}
```

#### PasswordStrenthENUM

密码强度枚举。

```typescript
enum PasswordStrenthENUM {
  FEEBLE = 'feeble',
  MIDDLE = 'middle',
  BETTER = 'better',
  FORTISSIMO = 'fortissimo'
}
```

---

**注意**: 本文档基于最新版本，某些函数的具体实现可能会有所变化。建议查看源代码或 TypeScript 类型定义获取最准确的信息。
